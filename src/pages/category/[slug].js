import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
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
    TableRow,
    TextField,
  } from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

const Page = () => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [textToAdd, setTextToAdd] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/student/show-category-by-id?id=${router.query.slug}`);
      const data = response.data;
      setCategoryData(data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    if (router.query.slug) {
      fetchData();
    }
  }, [router.query.slug]);

  const handleAddText = () => {
    setIsAddDialogOpen(true);
  };

  const handleSaveText = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/student/add-text', {
        text: textToAdd,
        category_id: categoryData.id, // Assuming you have categoryData.id available
      });
      console.log(response.data.message);
      setIsAddDialogOpen(false);
      setTextToAdd('');
    } catch (error) {
      console.error('Error adding text:', error);
    }
  };

  const [textData, setTextData] = useState(null);

  const fetchTextData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/student/get-text-by-id?id=${categoryData.id}`);
      const data = response.data;
      setTextData(data.get_text);
    } catch (error) {
      console.error('Error fetching text data:', error);
    }
  };

  useEffect(() => {
    if (categoryData) {
      fetchTextData();
    }
  }, [categoryData]);

  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        // alignItems: 'center', 
        height: '100vh', 
        width: '100%' 
      }}>
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryData ? (
                  <TableRow hover>
                    <TableCell>
                      <Avatar src={categoryData.image} />
                    </TableCell>
                    <TableCell>
                      {categoryData.category_name}
                    </TableCell>
                    <TableCell>
                      <Button onClick={handleAddText}>Add Text</Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>Loading...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>

        {textData && (
        <Card>
          <Scrollbar>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Text</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {textData.map((text) => (
                    <TableRow key={text.id}>
                      <TableCell>{text.text}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Scrollbar>
        </Card>
      )}

      </Card>
      

      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
        <DialogTitle>Add Text</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Text"
            variant="outlined"
            value={textToAdd}
            onChange={(e) => setTextToAdd(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveText}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
export default Page;
