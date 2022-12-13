export default function Thead({ ...props }) {
    return (
        <thead className="bg-dogger-orange-400 text-white">
            <tr>
                { props.tableTitles.map((title, index) => (
                    <th scope="col" className="custom_th" key={index}>
                        {title}
                    </th>
                ))}
                { props.hasActions &&
                    <th
                        scope="col"
                        className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        Actions
                    </th>
                }
            </tr>
        </thead>
    );
}
