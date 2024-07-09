<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'super-admin']);

        $post_permissions = Permission::where('name', 'like', '%posts%')->get();
        $post_role = Role::create(['name' => 'posts-access']);
        $post_role->givePermissionTo($post_permissions);

        $permission_permissions = Permission::where('name', 'like', '%permissions%')->get();
        $permission_role = Role::create(['name' => 'permissions-access']);
        $permission_role->givePermissionTo($permission_permissions);

        $role_permissions = Permission::where('name', 'like', '%roles%')->get();
        $role_role = Role::create(['name' => 'roles-access']);
        $role_role->givePermissionTo($role_permissions);

        $user_permissions = Permission::where('name', 'like', '%users%')->get();
        $user_role = Role::create(['name' => 'users-access']);
        $user_role->givePermissionTo($user_permissions);
    }
}
