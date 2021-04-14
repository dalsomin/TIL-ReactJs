import React, {
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Swal from 'sweetalert2';
import { setAGGridClientFilter } from '@/utils/common-utils';
import { COMMON } from '@/features/commonSlice';
import { CommSearchBar } from '@/components/commons';
import { AGGridClient } from '@/components/datagrids';
import { isEmpty } from 'lodash';
import { getAuthorityUserList, getRoles, checkUserToProject } from '@/api';
import {
    Button,
    createStyles,
    Grid,
    Icon,
    makeStyles,
    Theme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CMultiRoleSelect } from '@/openstackit/components/multiSelect';
import { CButton } from '@/components/buttons';

const PAGE_SIZE = 10;
export interface ProjectAddUserProps {
    ProjectData?: any;
    formData?: any;
    ref: any;
}

const ProjectAddUser: React.FC<ProjectAddUserProps> = forwardRef(
    (props, ref) => {
        const {
            formData,
            //  ProjectData
        } = props;
        const { t } = useTranslation();

        const { locale } = useSelector((state) => state[COMMON]);

        const [columnDefs, setColumnDefs] = useState([{}]);
        const [columnMemberDefs, setColumnMemberDefs] = useState([{}]);

        const [rowData, setRowData] = useState<any>([]);
        const [rowMemberData, setRowMemberData] = useState<any>([]);
        const [isLoaded, setIsLoaded] = useState<Boolean>(false);
        const editorRef = useRef<any>(null);

        const [api, setApi] = useState<any | undefined>();
        const [projectMemberList, setProjectMemberList] = useState<any>({});
        const searchRef = useRef<any>(null);
        const [userRoleDataList, setUserRoleDataList] = useState<any>([]);

        // useImperativeHandle(ref, () => ({
        //     getProjectMemberList: () => {
        //         console.log('userRoleDataList>>>', userRoleDataList);
        //         return userRoleDataList;
        //     },
        // }));

        useEffect(() => {
            const colDef = [
                {
                    headerName: '사용자 이름', // 컬럼 명
                    field: 'name', // 해당 컬럼과 매치되는 데이터의 Key
                    resizable: true, // 조절 가능 여부
                    sortable: true, // 정렬 여부
                    filter: true, // 필터 여부
                },
                {
                    headerName: '사용자 추가',
                    field: '',
                    cellRenderer: (params) => {
                        return params.data
                            ? `<input type='button' value='추가'/>`
                            : '';
                    },
                },
            ];

            setColumnDefs(colDef);

            api && api.sizeColumnsToFit();
        }, [locale]);

        useEffect(() => {
            const colDef = [
                {
                    headerName: '추가된 멤버', // 컬럼 명
                    field: 'name', // 해당 컬럼과 매치되는 데이터의 Key
                    resizable: true, // 조절 가능 여부
                    sortable: true, // 정렬 여부
                    filter: true, // 필터 여부
                },
                {
                    headerName: '역할 추가', // 컬럼 명
                    resizable: true, // 조절 가능 여부
                    cellRenderer: 'CMultiRoleSelect',
                    cellRendererParams: {
                        addSelectedUser: (arr) => {
                            let arrData: any = [];

                            setUserRoleDataList((userRoleDataList) => {
                                const filtered = userRoleDataList.filter(
                                    (row) => row.userId !== arr.userId,
                                );

                                arrData = [...filtered, arr];

                                return arrData;
                            });

                            return arrData;
                        },
                        formData: formData ? formData : [],
                    },
                },
                {
                    headerName: '제거', // 컬럼 명
                    resizable: true, // 조절 가능 여부
                    cellRenderer: 'CRemoveMemberButton',
                },
            ];

            setColumnMemberDefs(colDef);

            api && api.sizeColumnsToFit();
        }, [locale]);

        console.log(userRoleDataList);
        useImperativeHandle(ref, () => {
            console.log('작동되나요......', userRoleDataList);
            return {
                getProjectMemberList: userRoleDataList,
            };
        });

        // const [memo] = useState(false);

        useEffect(() => {
            if (formData) {
                console.log('formData있을 때 set해주는 곳.222...', formData);
                if (rowData) {
                    console.log('sdfsdfsdf', rowData);
                    // console.log('userList,,,,', rowData);
                    const newList = rowData.filter(
                        (userlist) =>
                            formData.filter((row) => row.userId === userlist.id)
                                .length > 0, //조건
                    );
                    console.log('newList,,,', newList);
                    setRowMemberData(newList);
                }
            }
        }, [formData, rowData]);

        console.log('Here!', rowMemberData);

        /**
         * API로 부터 데이터를 가져오는 함수
         */
        const setGridList = async () => {
            api.showLoadingOverlay(); // 데이터 로딩 화면 표시

            /**
             * API 부터 가져온 데이터를 state: rowData에 설정한다.
             */
            getAuthorityUserList()
                .then((res: any) => {
                    if (res) {
                        if (!isLoaded) {
                            setRowData(res); // 데이터 저장
                            setIsLoaded(true);

                            api.hideOverlay(); // 데이터 로딩 화면 숨김
                        }
                    } else {
                        api.showNoRowsOverlay();
                    }
                })
                .catch(() => api.hideOverlay());
        };

        /**
         * AG Grid와 state: api가 바인딩 되면 API로 부터 데이터를 가져옴
         */
        useEffect(() => {
            api && setGridList();
        }, [api]);

        /**
         * AG Grid 컴포넌트가 준비되면 실행되는 함수 (AG Grid에 Props로 넘김)
         *
         * @param params
         * @returns 없음
         */
        const onGridReady = (params: any) => {
            setApi(params.api);
        };

        /**
         * 검색 처리하는 함수
         * 필터가 적용된 결과를 state: rowData에 다시 저장
         *
         * @param 없음
         * @returns 없음
         */
        const handleSearch = () => {
            const searchtxt =
                (searchRef.current && searchRef.current.getCommSearchText()) ||
                '';

            if (searchtxt) {
                api.setFilterModel(null);
                setRowData(
                    setAGGridClientFilter(rowData, columnDefs, searchtxt),
                );
            } else {
                setGridList();
            }
        };

        const handleClear = () => {
            api.setFilterModel(null);
            setGridList();
        };

        const handleGridClickToAddMember = (e: any) => {
            // console.log('add click>>>', e.data);
            addItemsBtn(e.data);
            api.sizeColumnsToFit();
        };

        const addItemsBtn = (clickedData) => {
            if (
                rowMemberData.find((data) => data === clickedData) === undefined
            ) {
                setRowMemberData([...rowMemberData, clickedData]);
            } else {
                Swal.fire('Notice', '이미 추가된 사용자 입니다.', 'warning');
            }
        };

        const useStyles = makeStyles((theme: Theme) =>
            createStyles({
                root: {
                    flexGrow: 1,
                },
                paper: {
                    padding: theme.spacing(2),
                    textAlign: 'left',
                    color: theme.palette.text.secondary,
                    height: '320px',
                },
                outLinePaper: {
                    padding: theme.spacing(1),
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    height: '450px',
                },
            }),
        );

        const classes = useStyles();

        const CRemoveMemberButton = (props) => {
            return (
                <CButton onClick={() => removeItemsBtn(props.data)}>
                    제거
                </CButton>
            );
        };

        const removeItemsBtn = (clickedData) => {
            // console.log('clickedData,', clickedData);
            const result = rowMemberData.filter((data) => data !== clickedData);
            setRowMemberData(result);
        };
        return (
            <Paper className={classes.outLinePaper}>
                <CommSearchBar
                    ref={searchRef}
                    onSearch={handleSearch} // 검색 버튼 클릭 시
                    onClear={handleClear} // 새로고침 버튼 클릭 시
                ></CommSearchBar>

                <Grid container spacing={3} justify="flex-start">
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h5>전체 사용자 리스트</h5>
                            {/* 액션 버튼 생성 */}
                            {/* <CButton
                        type="btn1"
                        variant="contained"
                        onClick={addItemsBtn}
                    >
                        {formatMessage({ id: 'o.add member' })}
                        </CButton> */}

                            <AGGridClient
                                rowData={rowData} // API로 부터 가져온 데이터
                                columnDefs={columnDefs} // 컬럼 정의 정보
                                rowPerPage={PAGE_SIZE} // 한 페이지에 보여줄 데이터 수
                                locale={locale} // locale 정보
                                onGridReady={onGridReady} // AG Grid 컴포넌트가 준비될 때 실행
                                onCellClicked={handleGridClickToAddMember} // 테이블 Row를 클릭할 때 이벤트 처리
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <h5>멤버 리스트</h5>
                            {/* 액션 버튼 생성
                        <CButton
                        type="btn1"
                        variant="contained"
                        onClick={handleGridClick}
                    >
                        {formatMessage({ id: '멤버에서 제외' })}
                        </CButton> */}
                            <AGGridClient
                                rowData={rowMemberData} // API로 부터 가져온 데이터
                                columnDefs={columnMemberDefs} // 컬럼 정의 정보
                                rowPerPage={PAGE_SIZE} // 한 페이지에 보여줄 데이터 수
                                locale={locale} // locale 정보
                                onGridReady={onGridReady} // AG Grid 컴포넌트가 준비될 때 실행
                                // onCellClicked={handleGridClickToRemoveMember}     // 테이블 Row를 클릭할 때 이벤트 처리
                                frameworkComponents={{
                                    CMultiRoleSelect,
                                    CRemoveMemberButton,
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        );
    },
);

export { ProjectAddUser };
