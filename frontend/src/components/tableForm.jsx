import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {getPurchases, deletePurchase, reset} from '../features/purchases/purchaseSlice'
import {useSelector, useDispatch} from 'react-redux'
import { Button } from '@mui/material'
import EditButton from './EditButton'
import  EditButton2  from './EditButton2'
import EditModal from './EditModal'

const TableForm = () => {

  const [pageSize, setPageSize] = useState(10);
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const {purchases, isError, message} = useSelector((state) => state.purchases)


  useEffect(() => {

    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPurchases());


  }, [user, navigate, isError, message, dispatch])

 

  const DeleteButton = (id) => {
    return (
        <strong>
            <Button
                className="delete"
                variant="contained"
                color="primary"
                size="small"
                style={{ margin: 0}}
                onClick={() => {
                  dispatch(deletePurchase(id));
                  // console.log(id);
                }}
            >
                 X           
            </Button>
        </strong>
    )
}
//   const renderEditButton = (id) => {
//     return (
//         <Button>Edit</Button>
//     )
// }

    
  const columns = [
    {
        field: 'delete',
        headerName: 'Delete',
        width: 100,
        renderCell: (params) => {
          //console.log(params)
          return DeleteButton(params.id)
        },
        disableClickEventBubbling: true,
    },
    {
        field: 'edit',
        headerName: 'Edit',
        width: 100,
        renderCell: (params) => {
          // console.log(params, "params")
          // console.log(params.id, "params.id")
          // console.log(params.row, "params.row")
          return (
          <EditModal purchase={params.row} />
          )
        },
        disableClickEventBubbling: true,
    },
    {field: '_id', headerName: 'ID', sortable: 'false', filterable: 'false', disableColumnMenu: 'true', visibility: 'false'},
    {field: 'title', headerName: 'Title', editable: false},
    {field: 'producer', headerName: 'Producer'},
    {field: 'director', headerName: 'Director'},
    {field: 'platform', headerName: 'Platform'},
    {field: 'year', headerName: 'Year of Release', maxwidth: 75},
    {field: 'price', headerName: 'Price', maxwidth: 75},
    {field: 'length', maxwidth: 75},
    {field: 'startDate', headerName: "Start", minWidth: 100, type: 'date', valueGetter: ({ value }) => value && new Date(value)},
    {field: 'endDate', headerName: "End", minWidth: 100, type: 'date', valueGetter: ({ value }) => value && new Date(value)},
    {field: 'requesterName', headerName: 'Requester Name'},
    {field: 'requesterEmail', headerName: 'Requester Email'},
    {field: 'requesterDepartment', headerName: 'Requester Department'},
    {field: 'notes', headerName: 'Notes/Comments'},
    {field: 'createdAt', headerName: 'Created On', minWidth: 200, type: 'dateTime', valueGetter: ({ value }) => value && new Date(value)},
    {field: 'editedAt', headerName: 'Last Edited', minWidth: 200, type: 'dateTime', valueGetter: ({ value }) => value && new Date(value)},
    
    /*{
        field: 'col6',
        headerName: 'Delete',
        width: 150,
        renderCell: renderDetailsButton,
        disableClickEventBubbling: true,
    },*/
  ];


  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid experimentalFeatures={{ newEditingApi: true }} getRowId={row => row._id}
        sx={{
          boxShadow: 1,
          border: 1,
          borderColor: 'lightgrey',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        initialState={{
          columns:{
            columnVisibilityModel: {_id: false}
          },
        pagination: {
          pageSize: 10,
          },
        }}
        rows={purchases}
        columns= {columns}
        components={{Toolbar: GridToolbar}}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  )
}

export default TableForm