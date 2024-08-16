import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Guest from '@/Layouts/GuestLayout';
import { FormatDate, FormatNumber } from '@/Utils';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { IoIosSend } from "react-icons/io";

export default function Welcome({ auth, jobs, flashMessage }) {
    const [searchText, setSearchText] = useState('');
    const columns = [
        {
            name: 'Post Date',
            selector: row => FormatDate(row.created_at),
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
            width:'10%',
            selector: row => row.location,
            sortable: true,
        },
        {
            name: 'Type',
            width:'10%',
            selector: row => row.type,
            cell: row => (
                <div className="capitalize">{row.type}</div>
            ),
            sortable: true,
        },
        {
            name: 'Sallary Min',
            width:'10%',
            selector: row => row.salary_min || 0,
            cell: row => FormatNumber(row.salary_min),
            sortable: true,
        },
        {
            name: 'Sallary Max',
            width:'10%',
            selector: row => row.salary_max || 0,
            cell: row => FormatNumber(row.salary_max),
            sortable: true,
        },
        {
            name: 'Action',
            width:'10%',
            cell: row => (
                <div className="flex items-center gap-3">
                    <Link href={route('apply', row.slug)}>
                        <PrimaryButton className='bg-orange-500 hover:bg-orange-600 active:bg-orange-600 focus:bg-orange-600 focus:ring-orange-500'>
                            <IoIosSend className='text-xl'/>
                        </PrimaryButton>
                    </Link>
                </div>
            )
        }
    ];

    const filteredData = jobs.filter((row) =>
        row.title.toLowerCase().includes(searchText.toLowerCase()) ||
        row.location.toLowerCase().includes(searchText.toLowerCase()) ||
        row.description.toLowerCase().includes(searchText.toLowerCase()) ||
        row.type.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Guest auth={auth} flashMessage={flashMessage}>
            <Head title="Welcome" />
            <div className="w-full p-5 bg-white rounded shadow">
                <div className="flex items-center justify-between mb-5">
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
       </Guest>
    );
}
