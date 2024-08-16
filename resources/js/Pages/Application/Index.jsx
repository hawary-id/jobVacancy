import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FormatDate } from '@/Utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function Index({ auth, applications, flashMessage }) {
    const [searchText, setSearchText] = useState('');
    const {delete: destroy} = useForm();
    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: "Do you want to Delete this Data?",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            confirmButtonColor:'#F97316'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('application.destroy', id));
            }
        });
    }
    const columns = [
        {
            name: 'Job Position',
            selector: row => row.job_vacancy?.title,
            sortable: true,

        },
        {
            name: 'name',
            selector: row => row.name,
        },
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Cover letter',
            cell: row => row.cover_letter,
        },
        {
            name: 'Apply Date',
            selector: row => row.created_at,
            cell: row => FormatDate(row.created_at, 'yyyy-MM-dd, hh:mm'),
            sortable: true,

        },
        {
            name: 'Resume',
            cell: row => (
                <a href={row.resume} target="_BLANK">
                    <SecondaryButton>Resume</SecondaryButton>
                </a>
            )
        },
        
        {
            name: 'Action',
            cell: row => (
                <div className="flex gap-3 items-center">
                    <Link href={route('application.show', row.id)}>
                        <PrimaryButton >
                            <FaEye className='text-xs'/>
                        </PrimaryButton>
                    </Link>
                    <PrimaryButton className='bg-rose-500 hover:bg-rose-600 active:bg-rose-600 focus:bg-rose-600 focus:ring-rose-500' onClick={() => handleDelete(row.id)}>
                        <FaRegTrashAlt className='text-xs'/>
                    </PrimaryButton>
                </div>
            )
        }
    ];

    const filteredData = applications.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.email.toLowerCase().includes(searchText.toLowerCase()) ||
        row.cover_letter.toLowerCase().includes(searchText.toLowerCase()) ||
        row.job_vacancy?.title.toLowerCase().includes(searchText.toLowerCase())
    );
    
    
    
    return (
        <AuthenticatedLayout
            flashMessage={flashMessage}
            user={auth.user}
        >
            <Head title="Application" />

            <div className="py-5">
                <div className="container mx-auto px-3 md:px-0">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <div className="flex justify-between items-center mb-5">
                            <h1 className='text-xl font-bold'>Applications Data</h1>
                            <TextInput
                                type="search"
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search..."/>
                        </div>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
