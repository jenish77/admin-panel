import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios'
import { CategoryTable } from '../sections/customer/category-table'; 
import { Box } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ image: '', categoryName: '' });
  const [categories, setCategories] = useState([]);

  const handleCategoryClick = () => {
    setIsPopupOpen(true);
  };

  const handleSaveCategory = async () => {
    const imageInput = document.getElementById('imageInput');
    const categoryInput = document.getElementById('categoryInput');

    const newFormData = new FormData();
    newFormData.append('image', imageInput.files[0]);

    try {
      const response = await axios.post('http://localhost:3001/api/student/upload-image', newFormData);

      setFormData({
        image: response.data.imageName,
        category_name: categoryInput.value
      });

      const categoryData = {
        image: response.data.imageName,
        category_name:categoryInput.value
      };

      try {
        const addCategoryResponse  = await axios.post('http://localhost:3001/api/student/add-category', categoryData);
        console.log(addCategoryResponse.data);
        setIsPopupOpen(false);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
console.log("HERERRERERE");
  const fetchData = async () => {
    try {
      const categoryResponse = await axios.get('http://localhost:3001/api/student/show-category');
      console.log("categoryResponse",categoryResponse);
      setCategories(categoryResponse.data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Overview | Admin Panel</title>
      </Head>
      <button 
        onClick={handleCategoryClick} 
        style={{
          float: 'right', 
          margin: '8px', 
          padding: '5px 10px', 
          fontSize: '12px', 
          width: '80px', 
          height: '30px', 
          backgroundColor: '#8A2BE2', 
          color: '#FFFFFF', 
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Category
      </button>
      {isPopupOpen && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#fff',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          zIndex: 9999,
        }}>
          <label>
            Image:
            <input 
              type="file" 
              id="imageInput" 
              accept="image/*" 
              style={{ 
                width: '100%', 
                padding: '8px', 
                fontSize: '14px', 
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }} 
            />
          </label>
          <br />
          <label>
            Category Name:
            <input 
              type="text" 
              id="categoryInput" 
              style={{ 
                width: '100%', 
                padding: '8px', 
                fontSize: '14px', 
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }} 
            />
          </label>
          <br />
          <button 
            onClick={handleSaveCategory} 
            style={{ 
              backgroundColor: '#4CAF50', 
              color: '#FFFFFF', 
              padding: '10px 20px', 
              fontSize: '14px', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      )}

      <Box sx={{ mt: 4 }}>
        <CategoryTable
          items={categories}
          selected={[]}
          onSelectAll={() => {}}
          onSelectOne={() => {}}
          onDeselectAll={() => {}}
          onDeselectOne={() => {}}
          count={categories.length}
          page={0}
          rowsPerPage={10}
          onRowsPerPageChange={() => {}}
          onPageChange={() => {}}
        />
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
