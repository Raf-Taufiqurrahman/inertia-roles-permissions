import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Checkbox from '@/Components/Checkbox';
import Swal from 'sweetalert2';
export default function Create({auth}) {

    // destruct permissions from usepage props
    const { permissions } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors } = useForm({
        name : '',
        selectedPermissions : []
    });

    // define method handleSelectedPermissions
    const handleSelectedPermissions = (e) => {
        let items = data.selectedPermissions;

        items.push(e.target.value);

        setData('selectedPermissions', items);
    }

    // define method handleStoreData
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('roles.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Role</h2>}
        >
            <Head title={'Create Roles'}/>
            <Container>
                <Card title={'Create new role'}>
                    <form onSubmit={handleStoreData}>
                        <div className='mb-4'>
                            <Input label={'Role Name'} type={'text'} value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} placeholder="Input role name.."/>
                        </div>
                        <div className='mb-4'>
                        <div className={`p-4 rounded-t-lg border bg-white`}>
                            <div className='flex items-center gap-2 text-sm text-gray-700'>
                                Permissions
                            </div>
                        </div>
                        <div className='p-4 rounded-b-lg border border-t-0 bg-gray-100'>
                            <div className='flex flex-row flex-wrap gap-4'>
                                {permissions.map((permission, i) => (
                                    <Checkbox label={permission.name} value={permission.name} onChange={handleSelectedPermissions} key={i}/>
                                ))}
                            </div>
                            {errors.selectedPermissions && <div className='text-xs text-red-500 mt-4'>{errors.selectedPermissions}</div>}
                        </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'}/>
                            <Button type={'cancel'} url={route('roles.index')}/>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
}