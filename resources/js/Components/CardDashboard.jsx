export default function CardDashboard({title, subtitle}) {
    return (
        <div className="w-full p-5 bg-white rounded-md shadow overflow-hidden">
            <div className="font-light mb-1 text-gray-500 text-sm">{title}</div>
            <div className="font-bold text-4xl text-orange-500">{subtitle}</div>
        </div>
    )
}