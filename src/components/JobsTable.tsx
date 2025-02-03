'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import Button from '@mui/material/Button';

interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
}

interface JobsTableProps {
    jobs: Job[];
}

export default function JobsTable({ jobs }: JobsTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <TablePagination
                rowsPerPageOptions={[10, 50, 100]}
                component="div"
                count={jobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="每页行数:"
            />
            <Table sx={{
                minWidth: 650,
                '& thead': {
                    display: 'table',
                    width: '100%',
                    tableLayout: 'fixed'
                },
                '& tbody': {
                    display: 'block',
                    height: '800px',  // 设置固定高度
                    overflowY: 'auto',
                    '& tr': {
                        display: 'table',
                        width: '100%',
                        tableLayout: 'fixed'
                    }
                }
            }} aria-label="职位列表">
                <TableHead>
                    <TableRow>
                        <TableCell>职位名称</TableCell>
                        <TableCell>公司</TableCell>
                        <TableCell>地点</TableCell>
                        <TableCell>薪资</TableCell>
                        <TableCell>create_time</TableCell>
                        <TableCell>update_time</TableCell>
                        <TableCell>status</TableCell>
                        <TableCell>操作</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((job) => (
                            <TableRow key={job.id}>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.company}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>{job.salary}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => alert(`进入职位 ${job.id} 详情`)}
                                    >
                                        详情
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 50, 100]}
                component="div"
                count={jobs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="每页行数:"
            />
        </TableContainer>
    );
} 