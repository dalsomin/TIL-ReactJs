import React, {
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
    useMemo,
} from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ButtonProps } from '@material-ui/core/Button';
import { CDialogTitle, CDialogAction } from '../../../components/dialogs/index';
import { PaperProps } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
    ProjectBasicForm,
    ProjectAddGroup,
    ProjectAddUser,
} from '@/openstackit/components/project';
import Swal from 'sweetalert2';
import { createProject, grantUserToProject } from '@/api';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: 'inline-block',
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

export interface CDialogStepperCreateProps {
    id: string;
    title?: string;
    modules?: Array<string>;
    variant?: ButtonProps['variant'];
    validated?: boolean;
    children?: React.ReactNode;
    open: boolean;
    fullWidth?: boolean;
    maxWidth?: DialogProps['maxWidth'];
    PaperProps?: PaperProps;
    ProjectData?: any;
    formData?: any;
    onCreate?: () => void;
    onUpdate?: () => void;
    onDelete?: () => void;
    onCheck?: () => void;
    onClose?: () => void;
}

const CDialogStepperCreate: React.FC<CDialogStepperCreateProps> = (props) => {
    const {
        id,
        title,
        modules,
        variant,
        validated,
        children,
        fullWidth = true,
        maxWidth,
        onCreate,
        onUpdate,
        onDelete,
        onCheck,
        onClose,
        PaperProps,
        ProjectData,
        formData,
        ...other
    } = props;

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const editorRef = useRef<any>(null);
    const [projectBasicForm, setProjectBasicForm] = useState<any>({});
    const [projectMemberList, setProjectMemberList] = useState<any>([]);
    const [projectGroupList, setProjectGroupList] = useState<any>([]);

    const steps = ['프로젝트 정보', '프로젝트 멤버', '프로젝트 그룹'];
    const { t } = useTranslation();
    // useImperativeHandle(ref, () => {
    //     console.log('CdialogStepper - ref : ', ref);
    //     return {
    //         setProjectBasic(editorRef.current.getProjectBasicForm);
    //         getProjectMemberList: editorRef.current.getProjectMemberList,
    //         getProjectGroupList: editorRef.current.getProjectGroupList,
    //     };
    // });
    // useEffect(() => {
    //     setProjectMemberList({ ...editorRef.current.getProjectMemberList });
    //     console.log('projectMemberList?', projectMemberList);
    // }, [projectMemberList]);
    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <ProjectBasicForm
                        ProjectData={ProjectData}
                        formData={projectBasicForm}
                        ref={editorRef}
                    />
                );
            case 1:
                return (
                    <ProjectAddUser
                        ref={editorRef}
                        ProjectData={ProjectData}
                        formData={projectMemberList}
                    />
                );
            case 2:
                return (
                    <ProjectAddGroup
                        ref={editorRef}
                        formData={projectGroupList}
                    />
                );
            default:
                return (
                    <ProjectBasicForm
                        ref={editorRef}
                        ProjectData={ProjectData}
                    />
                );
        }
    };

    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        switch (activeStep) {
            case 0:
                setProjectBasicForm({
                    ...projectBasicForm,
                    ...editorRef.current.getProjectBasicForm,
                });
                break;
            case 1:
                setProjectMemberList([
                    ...projectMemberList,
                    ...editorRef.current.getProjectMemberList,
                ]);
                console.log(
                    'editorRef.current.getProjectMemberList>>>>>',
                    editorRef.current.getProjectMemberList,
                );

                break;
            case 2:
                setProjectGroupList([
                    ...projectGroupList,
                    ...editorRef.current.getProjectGroupList,
                ]);

                break;
        }
        const newActiveStep = isLastStep() ? totalSteps() : activeStep + 1;

        setActiveStep(newActiveStep);
    };
    console.log('1depth:handlenext-projectMemberList>>>>>', projectMemberList);
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const onCreateProject = () => {
        console.log('생성 클릭!!!!');
        console.log('getProjectBasicForm', projectBasicForm);
        console.log('getProjectMemberList', projectMemberList);
        console.log('getProjectGroupList', projectGroupList);

        createProject(projectBasicForm)
            .then((res: any) => {
                console.log('createProject 성공?', res);

                projectMemberList.forEach((memberData) => {
                    console.log('memberData?', memberData);
                    memberData.roles.forEach((roleId) => {
                        console.log('roleId?', roleId);
                        grantUserToProject(
                            res.data.id,
                            memberData.userId,
                            roleId,
                        ).then((res: any) => {
                            console.log('grantUserToProject 성공?', res);
                        });
                    });
                });

                Swal.fire(undefined, '정상적으로 완료되었습니다.', 'success');
            })
            .catch((res) => {
                console.log('실패??', res);
                Swal.fire(
                    res.error,
                    `프로젝트 생성이 실패하였습니다. (${res.message})`,
                    'error',
                );
                console.log(res);
            });
    };

    return (
        <div className={classes.root}>
            <Dialog
                onClose={onClose}
                aria-labelledby={props.id}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                {...other}
            >
                <CDialogTitle id={props.id} onClose={onClose}>
                    {title}
                </CDialogTitle>
                <DialogContent dividers>{children}</DialogContent>

                <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const buttonProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepButton
                                    onClick={handleStep(index)}
                                    {...buttonProps}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    <div>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                {t('o.back')}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {t('o.next')}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onCreateProject}
                                className={classes.button}
                                disabled={activeStep !== 2}
                            >
                                {t('o.create')}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* <CDialogAction
                    modules={modules}
                    variant={variant}
                    validated={validated}
                    // onCreate={onCreateProject}
                    // onUpdate={onUpdate}
                    // onDelete={onDelete}
                    // onCheck={onCheck}
                    // onClose={onClose}
                ></CDialogAction> */}
            </Dialog>
        </div>
    );
};

export { CDialogStepperCreate };
