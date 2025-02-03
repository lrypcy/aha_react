import { Button, IconButton, SxProps, Theme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface AdvancedSearchButtonProps {
    open: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
}

export const AdvancedSearchButton = ({
    open,
    onClick,
    sx,
    children
}: AdvancedSearchButtonProps) => {
    return (
        <Button
            variant="contained"
            onClick={onClick}
            sx={{
                ml: 2,
                height: '56px',
                minWidth: '120px',
                ...sx
            }}
        >
            {children || '高级搜索'}
            <IconButton
                component="span"
                sx={{
                    color: 'inherit',
                    p: 0,
                    ml: 1,
                    transform: open ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s'
                }}
            >
                <ArrowDropDownIcon />
            </IconButton>
        </Button>
    );
}; 