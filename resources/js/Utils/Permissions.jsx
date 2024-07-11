import { usePage } from "@inertiajs/react";

export default function hasAnyPermission(permissions){

    // destruct auth from usepage props
    const { auth } = usePage().props

    // get all permissions from props auth
    let allPermissions = auth.permissions;

    // get super-admin role from props auth
    let superAdmin = auth.super;

    // define has permission is false
    let hasPermission = false;

    // loop permissions
    permissions.forEach(function(item){
        // do it if permission is match with key
        if(allPermissions[item])
            // assign hasPermission to true
            hasPermission = true;
    });

    // do it when super admin true
    if(superAdmin)
        // return true;
        return true;
    else
        // return has permissions
        return hasPermission;
}
