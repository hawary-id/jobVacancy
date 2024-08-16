import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FormatDate, FormatNumber } from '@/Utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import Swal from 'sweetalert2';

export default function Index({ auth, jobs, flashMessage }) {
    const [searchText, setSearchText] = useState('');
    const [modalApplication, setModalApplication]= useState(false);
    const {delete: destroy} = useForm();
    const [job, setJob] = useState(null);

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: "Do you want to Delete this Data?",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            confirmButtonColor:'#F97316'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('job.destroy', id));
            }
        });
    }

    const handleModalApplication = (row=null) => {
        if(row){
            setJob(row); 
        }else{
            setJob(null);
        }
        setModalApplication(!modalApplication);
    };
    
    const columns = [
        {
            name: 'Post Date',
            selector: row => row.created_at,
            cell: row => FormatDate(row.created_at),
            sortable: true,

        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,

        },
        {
            name: 'Description',
            cell: row => (
                <span className='text-xs'>{row.description}</span>
            ),
        },
        {
            name: 'Location',
            selector: row => row.location,
            sortable: true,
            width:'10%',
        },
        {
            name: 'Type',
            selector: row => row.type,
            cell: row => (
                <div className="capitalize">{row.type}</div>
            ),
            sortable: true,
            width:'10%',
        },
        {
            name: 'Sallary Min',
            selector: row => row.salary_min || 0,
            cell: row => FormatNumber(row.salary_min),
            sortable: true,
            width:'10%',
        },
        {
            name: 'Sallary Max',
            selector: row => row.salary_max || 0,
            cell: row => FormatNumber(row.salary_max),
            sortable: true,
            width:'10%',
        },
        {
            name: 'Applications',
            selector: row => row.applications_count,
            cell: row => (
                <SecondaryButton onClick={() => handleModalApplication(row)}>{row.applications_count}</SecondaryButton>
            ),
            sortable: true,
            width:'10%',
        },
        {
            name: 'Action',
            cell: row => (
                <div className="flex gap-3 items-center">
                    <Link href={route('job.edit', row.id)}>
                        <PrimaryButton className='bg-sky-500 hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600 focus:ring-sky-500'>
                            <GrEdit className='text-xs'/>
                        </PrimaryButton>
                    </Link>
                    <PrimaryButton className='bg-rose-500 hover:bg-rose-600 active:bg-rose-600 focus:bg-rose-600 focus:ring-rose-500' onClick={() => handleDelete(row.id)}>
                        <FaRegTrashAlt className='text-xs'/>
                    </PrimaryButton>
                </div>
            )
        }
    ];

    const columnApplications = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,

        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,

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
                </div>
            )
        }
    ]

    const filteredData = jobs.filter((row) =>
        row.title.toLowerCase().includes(searchText.toLowerCase()) ||
        row.location.toLowerCase().includes(searchText.toLowerCase()) ||
        row.description.toLowerCase().includes(searchText.toLowerCase()) ||
        row.type.toLowerCase().includes(searchText.toLowerCase())
    );
    
    return (
        <AuthenticatedLayout
            flashMessage={flashMessage}
            user={auth.user}
        >
            <Head title="Job" />

            <div className="py-5">
                <div className="container px-3 md:px-0 mx-auto">
                    <div className="flex w-full justify-end mb-5">
                        <Link href={route('job.create')}>
                            <PrimaryButton>+ Add</PrimaryButton>
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-5">
                        <div className="flex justify-between items-center mb-5">
                            <h1 className='text-xl font-bold'>Jobs Data</h1>
                            <TextInput
                                type="search"
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search..."/>
                        </div>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            striped
                        />
                    </div>
                </div>
            </div>
            <Modal show={modalApplication} onClose={handleModalApplication}>
                <div className="w-full p-5">
                    {job && (
                        <>
                            <h1 className='text-orange-600 text-xl font-semibold mb-2'>{job.title}</h1>
                            <DataTable
                                columns={columnApplications}
                                data={job.applications}
                                pagination
                                striped
                            />
                        </>
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
