import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
    useRef,
} from 'react';
import clsx from 'clsx';
import {
    createStyles,
    makeStyles,
    useTheme,
    Theme,
} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { getRoles } from '@/api/roles';
import { CButton } from '@/components/buttons';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            margin: -1,
        },
    },
};

const CMultiRoleSelect = (props: any) => {
    const { data, addSelectedUser, formData } = props; ///
    const [selectedRoles, setSelectedRoles] = useState<any>([]);
    const [roleItems, setRoleItems] = useState<any>([]);
    const [checkedRoles, setCheckedRoles] = useState<any>([]);

    useEffect(() => {
        getRoles()
            .then((res: any) => {
                setRoleItems(res); //selectBox에 뿌려주는 role list
            })
            .catch(() => console.log('error'));
    }, []);

    useEffect(() => {
        if (formData.length > 0) {
            const temp = formData.filter(
                (selectedUser) => selectedUser.userId === data.id,
            );
            if (temp.length > 0) {
                setCheckedRoles(temp[0].roles);
            }
        }
    }, [formData]);

    const handleRoleChange = (e) => {
        if (!selectedRoles.includes(e.target.value) && e.target.checked) {
            setSelectedRoles([...selectedRoles, e.target.value]);
            const test = addSelectedUser({
                userId: data.id,
                roles: [...selectedRoles, e.target.value],
            });

            const temp = test.filter(
                (selectedUser) => selectedUser.userId === data.id,
            );
            if (temp.length > 0) {
                setCheckedRoles(temp[0].roles);
            }
        } else if (
            selectedRoles.includes(e.target.value) &&
            !e.target.checked
        ) {
            setSelectedRoles(
                selectedRoles.filter((row) => row !== e.target.value),
            );
            const test = addSelectedUser({
                userId: data.id,
                roles: selectedRoles.filter((row) => row !== e.target.value),
            });

            const temp = test.filter(
                (selectedUser) => selectedUser.userId === data.id,
            );
            if (temp.length > 0) {
                setCheckedRoles(temp[0].roles);
            }
        }
    };

    return (
        <FormControl>
            <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={selectedRoles}
                MenuProps={MenuProps}
            >
                {roleItems.map((role: any) => (
                    <MenuItem key={role.id}>
                        <Checkbox
                            value={role.id}
                            onChange={handleRoleChange}
                            defaultChecked={
                                checkedRoles
                                    ? checkedRoles.includes(role.id)
                                    : false
                            }
                        />
                        <ListItemText primary={role.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export { CMultiRoleSelect };
