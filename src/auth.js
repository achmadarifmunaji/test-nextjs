import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
// import { authConfig } from "./lib/auth/admin/authconfig";
import { authConfig } from "./authconfig";
import { query } from './lib/connect';

const login = async (credentials) => {
    try {
        // const user = credentials;
        let queryLogin;
        let takeUser = {};
        let isPasswordCorrect = false;
        let user = {};
        if(credentials.whoLogin === 'admin'){
            queryLogin = `SELECT * FROM tbl_users WHERE username = ?`;
            takeUser = await query(queryLogin, [credentials.username]);

            user = takeUser[0];
            if(!user) throw new Error("Username atau password Salah!")
            
            if(credentials.password === user.password){
                isPasswordCorrect = true;
            }

        }else if(credentials.whoLogin === 'peserta'){
            queryLogin = `SELECT tbl_kelas.id as id_kelas
                          FROM tbl_kelas
                          JOIN tbl_peserta ON tbl_peserta.id = tbl_kelas.id_peserta
                          JOIN tbl_sesi ON tbl_sesi.id = tbl_kelas.id_sesi
                          WHERE tbl_sesi.status = ? AND tbl_peserta.kode_peserta = ? 
                          AND tbl_sesi.pin_sesi = ?`;
            takeUser = await query(queryLogin, ['1', credentials.kode_peserta, credentials.pin_sesi]);

            user = takeUser[0];
            console.log(user);
            if(!user) throw new Error("Kode Peserta atau PiN Sesi Salah!")
            
            if(user){
                isPasswordCorrect = true;
            }
        }else{
            throw new Error("Terjadi kesalahan saat login!");
        }
        
      if(!isPasswordCorrect) throw new Error("Gagal Login!"); 
        user['whoLogin'] = credentials.whoLogin;
        return user;

    } catch (error) {
        console.log(error);
        throw new Error("Gagal untuk login!")
    }
}
export const {signIn, signOut, auth} =  NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                try {  
                   const user = await login(credentials);
                   return user;
                } catch (error) {
                    return null
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, user}){
            if(user){
                token.username = user.username;
                token.nama = user.nama;
                token.whoLogin = user.whoLogin;
                token.id_kelas = user.id_kelas;
            }

            return token;
        },
        async session({session, token}){
            if(token){
                session.username = token.username;
                session.nama = token.nama;
                session.whoLogin = token.whoLogin;
                session.id_kelas = token.id_kelas;

            }

            return session;
        },
        
    },
})