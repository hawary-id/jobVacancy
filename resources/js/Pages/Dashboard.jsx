import CardDashboard from '@/Components/CardDashboard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, jobs, applications }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="container mx-auto px-3 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                   <CardDashboard title="Jobs" subtitle={jobs}/> 
                   <CardDashboard title="Applications" subtitle={applications}/> 
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}
