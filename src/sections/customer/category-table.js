import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import axios from 'axios';

export const CategoryTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ category_name: '' });
  const [dataId, setDataId] = useState()
  const handleCategoryEditClick = (id, categoryName) => {
    setDataId(id)
    setIsPopupOpen(true);
    setFormData({ ...formData, category_name: categoryName }); // Spread the previous state
  };
  
  const handleSaveCategoryEdit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/student/edit-category', {
        id: dataId, 
        category_name: formData.category_name
      });
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log(`Deleting category with ID ${id}`);
    try {
      const delete_response = await axios.delete('http://localhost:3001/api/student/delete-category', {
        headers: {
          id: id
        },
      });
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Category Name
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((category) => {
                const isSelected = selected.includes(category.id);

                return (
                  <TableRow
                    hover
                    key={category.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(category.id);
                          } else {
                            onDeselectOne?.(category.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar src={category.image} />
                    </TableCell>
                    <TableCell>
                      {category.category_name}
                    </TableCell>
                    <TableCell>
                      <button className="editButton" onClick={() => handleCategoryEditClick(category.id, category.category_name)}>Edit</button>
                      <button className="deleteButton" onClick={() => handleDelete(category.id)}>Delete</button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog open={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <DialogTitle>Edit Category Name</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Category Name"
            variant="outlined"
            value={formData.category_name}
            onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPopupOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCategoryEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

CategoryTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
