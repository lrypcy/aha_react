'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography
} from '@mui/material';

export default function NewJobPage() {
    const router = useRouter();
    const [newJobData, setNewJobData] = useState({
        Title: '',
        Config: {}
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateJob = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/internal/job', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newJobData)
            });

            if (!response.ok) throw new Error('Failed to create job');

            router.push('/jobs/AJob');
        } catch (error) {
            console.error('Error creating job:', error);
            alert('创建职位失败，请稍后重试');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <Typography variant="h4" gutterBottom>新建Job</Typography>

            <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} container spacing={1} alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant="body1">Title</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                fullWidth
                                value={newJobData.Title}
                                onChange={(e) => setNewJobData({ ...newJobData, Title: e.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={1} alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant="body1">Config</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                fullWidth
                                value={newJobData.Config}
                                onChange={(e) => setNewJobData({ ...newJobData, Config: e.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleCreateJob}
                            disabled={isSubmitting}
                            size="large"
                        >
                            {isSubmitting ? '提交中...' : '创建职位'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
