import Table from '../../Components/Molecules/Table/Table';

export default function ProjectsList() {
    return (
        <Table
            tableTitles={['Project', 'Created at']}
            tableKeys={['name', 'created_at']}
            data={[
                {name: 'test', created_at: 'test'}
            ]}
            actions={[
                { name: 'Edit', link: '/projects/edit', icon: 'tmp' },
                { name: 'Delete', link: '/projects/delete', icon: 'tmp' }
            ]}
        />
    );
};