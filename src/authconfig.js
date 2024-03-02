
export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [],
    pages:{
        signIn: "/login",
    },
    callbacks: {
        authorized({auth, request}){
            const isLoggedIn = auth?.user;
            // const isLoggedIn = true;
            // const isLoggedIn = auth.user.username ? true : false;
            let whoUser = 'Peserta';
            if(typeof isLoggedIn?.email !== 'undefined'){
                whoUser = 'Admin';
            }
            let redirectUrl = '';
            let isOnDashBoard;
            
            // console.log(auth)
            // const session = await auth();
            // if(whoUser == '' || !isLoggedIn){
            //     protectedRoute = request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/peserta");
            // }else{
            //     if(whoUser == 'Admin' && isLoggedIn){
            //         protectedRoute = request.nextUrl.pathname.startsWith("/admin/dashboard");
            //         redirectUrl = "/admin/dashboard"
                    
            //     }else if(whoUser == 'Peserta' && isLoggedIn){
            //         protectedRoute = request.nextUrl.pathname.startsWith("/admin");
            //         redirectUrl = "/latihan"
                    
            //     }else{
            //         return false;
            //     }
            //     return Response.redirect(new URL(redirectUrl, request.nextUrl));
            // }

            if(!whoUser == '' && isLoggedIn){
                if(whoUser === 'Admin'){
                    isOnDashBoard = request.nextUrl.pathname.startsWith("/dashboard");
                    redirectUrl = "/dashboard";
                }else if(whoUser === 'Peserta'){
                    isOnDashBoard = request.nextUrl.pathname.startsWith("/latihan")
                    redirectUrl = "/latihan";
                }
                isOnDashBoard = request.nextUrl.pathname.startsWith(redirectUrl);
            }else{
                return false
            }
            
            if(isOnDashBoard){
                if(isLoggedIn) return true
                return false 
            }else if(isLoggedIn){
                // return Response.redirect(new URL("/admin/dashboard/", request.nextUrl));
                return Response.redirect(new URL(redirectUrl, request.nextUrl));
                // return { redirectTo: redirectUrl };
            // }else if(isLoggedIn && whoUser === 'Peserta'){
            //     return Response.redirect(new URL("/latihan", request.nextUrl));
            }
            return true;
        }
    }
};