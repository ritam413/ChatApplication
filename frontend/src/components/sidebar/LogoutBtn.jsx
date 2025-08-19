import { LogOut } from 'lucide-react';
import {useLogout} from "../../hooks/useLogout.js";

export const LogOutButton = ()=>{
    const {logout,loading} = useLogout();

    return(
        <div className="mt-auto">
            {!loading ? (
                <LogOut className="w-6 h-6 cursor-pointer hover:text-red-400"
                onClick={logout}
                />
            ):(
                <span className="loading loading-spinner"> </span>
            )}
        </div>

    )
}