"use client";

import { ChangeEvent, FC, useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Popover,
    Checkbox,
    FormControlLabel,
    Divider,
    Switch
} from '@mui/material';
import TagInput from '@/components/TagInput'
import Link from 'next/link'

interface Props {
    onSearch: (params: SearchParams) => void;
}

interface SearchParams {
    experience?: string;
    education?: string;
    salaryRange?: string;
    endDate?: string;
    labels?: string[];
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

const JobSearch: FC<Props> = ({ onSearch }) => {
    const [searchTitle, setSearchTitle] = useState<string>('');
    const [searchCompany, setSearchCompany] = useState<string>('');
    const [searchLabels, setSearchLabels] = useState<string[]>([]);
    const [searchStatus, setSearchStatus] = useState<string>('all');
    const [filters, setFilters] = useState({
        myJobs: false,
        highSalary: false,
        urgent: false
    });
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [advSearchParams, setAdvSearchParams] = useState({
        experience: '',
        education: '',
        salaryRange: ''
    });
    const [searchStartDate, setSearchStartDate] = useState<string>('');
    const [searchEndDate, setSearchEndDate] = useState<string>('');
    const [sortField, setSortField] = useState<string>('postDate');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTitle(e.target.value);
    const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => setSearchCompany(e.target.value);
    const handleStatusChange = (e: ChangeEvent<{ value: unknown }>) =>
        setSearchStatus(e.target.value as string);

    const handleFilterChange = (filterName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: event.target.checked
        }));
    };

    const handleAdvancedSearchOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAdvancedSearchClose = () => {
        setAnchorEl(null);
    };

    const handleAdvParamChange = (field: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
        setAdvSearchParams(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => setSearchStartDate(e.target.value);
    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => setSearchEndDate(e.target.value);

    const handleSortFieldChange = (e: ChangeEvent<{ value: unknown }>) => {
        setSortField(e.target.value as string);
    };

    const handleSearch = () => {
        onSearch({
            ...advSearchParams,
            ...filters,
            startDate: searchStartDate,
            endDate: searchEndDate,
            labels: searchLabels,
            sortField,
            sortOrder
        });
        handleAdvancedSearchClose();
    };

    return (
        <Box sx={{
            flexGrow: 1,
            mb: 4,
            border: '1px solid',
            borderColor: 'grey.300',
            backgroundColor: 'blue.300',
            borderRadius: 1,
            p: 3  // 添加内边距
        }}>
            <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{
                    flexWrap: 'wrap',  // 允许换行
                    '& > .MuiGrid-item': {  // 为所有Grid item添加统一间距
                        paddingTop: '16px !important'
                    }
                }}
            >
                <Grid item xs={12} md={2}>
                    <TextField
                        fullWidth
                        label="职位名称"
                        variant="outlined"
                        onChange={handleTitleChange}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        fullWidth
                        label="公司名称"
                        variant="outlined"
                        onChange={handleCompanyChange}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>状态</InputLabel>
                        <Select
                            label="状态"
                            onChange={handleStatusChange}
                            defaultValue="all"
                        >
                            <MenuItem value="all">全部</MenuItem>
                            <MenuItem value="active">进行中</MenuItem>
                            <MenuItem value="expired">已结束</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        fullWidth
                        label="起始时间"
                        type="datetime-local"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleStartDateChange}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField
                        fullWidth
                        label="截止时间"
                        type="datetime-local"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleEndDateChange}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TagInput />
                </Grid>
                <Grid item>
                    <Divider
                        orientation="vertical"
                        sx={{
                            height: '80%',
                            margin: 'auto 16px',
                            backgroundColor: 'blue.500',
                        }}
                    />
                </Grid>


                <Grid item xs={12} md={2}>
                    <FormControl fullWidth>
                        <InputLabel>排序字段</InputLabel>
                        <Select
                            label="排序字段"
                            value={sortField}
                            onChange={handleSortFieldChange}
                        >
                            <MenuItem value="postDate">发布日期</MenuItem>
                            <MenuItem value="salary">薪资范围</MenuItem>
                            <MenuItem value="deadline">截止时间</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={sortOrder === 'asc'}
                                onChange={(e) => setSortOrder(e.target.checked ? 'asc' : 'desc')}
                                color="primary"
                            />
                        }
                        label={sortOrder === 'asc' ? '升序' : '降序'}
                        sx={{
                            mt: 2,
                            '& .MuiFormControlLabel-label': { fontWeight: 500 }
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item sx={{ marginLeft: 'auto' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filters.myJobs}
                                        onChange={handleFilterChange('myJobs')}
                                        color="primary"
                                    />
                                }
                                label="我的"
                            />
                        </Grid>
                    </Grid>
                </Grid> 

                <Grid
                    item
                    xs={12}
                    md="auto"
                    sx={{
                        marginLeft: 'auto',  // 右侧对齐
                        '@media (max-width: 900px)': {  // 小屏幕时占满宽度
                            width: '100%',
                            marginLeft: 0,
                            '& .MuiGrid-container': {
                                justifyContent: 'flex-start'
                            }
                        }
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button
                                variant="contained" 
                                color="primary"
                                onClick={handleSearch}
                                sx={{ minWidth: 100 }}
                            >
                                搜索
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleAdvancedSearchOpen}
                                sx={{ minWidth: 120 }}
                            >
                                高级搜索
                            </Button>
                        </Grid>
                        <Grid item>
                            <Link href="/jobs/New" passHref>
                                <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ minWidth: 100 }}
                                >
                                    新建
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleAdvancedSearchClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ p: 3, width: 300 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>工作经验</InputLabel>
                                <Select
                                    value={advSearchParams.experience}
                                    onChange={handleAdvParamChange('experience')}
                                    label="工作经验"
                                >
                                    <MenuItem value="">不限</MenuItem>
                                    <MenuItem value="1-3年">1-3年</MenuItem>
                                    <MenuItem value="3-5年">3-5年</MenuItem>
                                    <MenuItem value="5年以上">5年以上</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>学历要求</InputLabel>
                                <Select
                                    value={advSearchParams.education}
                                    onChange={handleAdvParamChange('education')}
                                    label="学历要求"
                                >
                                    <MenuItem value="">不限</MenuItem>
                                    <MenuItem value="大专">大专</MenuItem>
                                    <MenuItem value="本科">本科</MenuItem>
                                    <MenuItem value="硕士">硕士</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>薪资范围</InputLabel>
                                <Select
                                    value={advSearchParams.salaryRange}
                                    onChange={handleAdvParamChange('salaryRange')}
                                    label="薪资范围"
                                >
                                    <MenuItem value="">不限</MenuItem>
                                    <MenuItem value="10k以下">10k以下</MenuItem>
                                    <MenuItem value="10-20k">10-20k</MenuItem>
                                    <MenuItem value="20-30k">20-30k</MenuItem>
                                    <MenuItem value="30k以上">30k以上</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSearch}
                            >
                                应用筛选
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </Box>
    );
};

export default JobSearch; 