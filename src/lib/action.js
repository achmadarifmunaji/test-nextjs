"use server";

import { signIn } from "@/auth";

export const authenticate = async (formData) => {
    const {username, password, whoLogin, kode_peserta, pin_sesi} = Object.fromEntries(formData);
    try {
        if(username){
            await signIn("credentials", { username, password, whoLogin });
        }else{
            await signIn("credentials", { whoLogin, kode_peserta, pin_sesi });
        }
    } catch (error) {
        console.log("Akun yang digunakan tidak terdaftar:", error);
        throw error;
    }
}