import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../../../components/Card'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteIcon from '@mui/icons-material/Delete'
import Select from 'react-select'
import axiosInstance from '../../../js/api'
import makeAnimated from 'react-select/animated';
import CircularProgress from '@mui/material/CircularProgress';
const animatedComponents = makeAnimated();


const ImagePreview = ({ file, isSelected, onSelect, onRemove }) => (
  <div className="image-preview" style={{ position: 'relative' }}>
    {file.endsWith('.mp4') ? (
      <video
        src={file}
        alt={`Preview`}
        style={{
          width: '100px',
          height: '100px',
          margin: '5px',
          objectFit: 'cover',
          borderRadius: '4px',
          boxShadow: ' rgba(99, 99, 99, 0.4) 0px 2px 8px 0px',
          position: 'relative',
        }}
        className="mt-10"
        controls
      />
    ) : (
      // Otherwise, render an img element
      <label htmlFor={`image-radio-${file}`}>
        <img
          src={file}
          alt={`Preview`}
          style={{
            width: '100px',
            height: '100px',
            margin: '5px',
            objectFit: 'cover',
            borderRadius: '4px',
            boxShadow: ' rgba(99, 99, 99, 0.4) 0px 2px 8px 0px',
            position: 'relative',
          }}
          className="mt-10"
        />
      </label>
    )}
    <Button
      variant="danger"
      onClick={onRemove}
      className="delete-button"
      style={{
        fontSize: '16px',
        padding: '1px 6px',
        position: 'absolute',
        right: '10%',
        top: '13%',
      }}
    >
      <DeleteIcon sx={{ fontSize: '16px' }} />
    </Button>
  </div>
);

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    product_images: [],
    color_name: [],
    category_name: '',
    c_price: '',
    stockQuantity: '',
    length: '',
    breadth: '',
    height: '',
    weight: '',
    size: [],
  })
  const [categories, setCategories] = useState([])
  const [color, setColor] = useState([])
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newColorName, setNewColorName] = useState('')
  const [isAddingColor, setIsAddingColor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const fetchColorData = async () => {
    try {
      const response = await axiosInstance.get('/get-color')
      setColor(response.data.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/get-category')
        setCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchColorData()
    fetchCategories()
  }, [])

  const handleChange = async (e) => {
    const { id, value, files } = e.target

    if (id === 'product_images') {
      if (files.length > 0) {
        const fileList = Array.from(files)

        // Upload images to "file-upload" URL
        const formData = new FormData()
        fileList.forEach((file) => {
          formData.append('files', file)
        })

        try {
          setIsLoading(true);
          const response = await axiosInstance.post('/file-upload', formData)
          const uploadedImageURLs = response.data.data.fileURLs

          setProductData((prevData) => ({
            ...prevData,
            product_images: [...prevData.product_images, ...uploadedImageURLs],
          }))
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error('Error uploading images:', error)
          toast.error('Error uploading images. Please try again.')
        }
      }
    } else if (id === 'colors') {
      const selectedColors = value.map((colorName) => ({
        color_name: colorName,
      }))

      setProductData((prevData) => ({
        ...prevData,
        colors: selectedColors,
      }))
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [id]: value,
      }))
    }
  }

  // Function to handle color selection and new color addition
  const handleColorChange = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);

    setProductData((prevData) => ({
      ...prevData,
      color_name: selectedColors,
    }));

    if (selectedColors.includes('addColor')) {
      setIsAddingColor(true);
    } else {
      setIsAddingColor(false);
    }
  };

  const handleRemoveImage = (index) => {
    setProductData((prevData) => {
      const newImages = [...prevData.product_images]
      newImages.splice(index, 1)
      return {
        ...prevData,
        product_images: newImages,
      }
    })
    setSelectedImageIndex(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      !productData.name ||
      !productData.price ||
      !productData.description ||
      !productData.category_name ||
      !productData.c_price ||
      !productData.stockQuantity
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setIsLoading(true);
      await axiosInstance.post('/add-product', {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        category_name: productData.category_name,
        c_price: productData.c_price,
        stockQuantity: productData.stockQuantity,
        size: productData.size,
        weight: productData.weight,
        height: productData.height,
        breadth: productData.breadth,
        length: productData.length,
        color: productData.color_name,
        product_images: productData.product_images,
      })

      // Clear the form after successful submission
      setProductData({
        name: '',
        price: '',
        description: '',
        category_name: '',
        c_price: '',
        stockQuantity: '',
        size: [],
        color_name: [],
        product_images: [],
      })

      toast.success('Product added successfully!')
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error creating Product:', error)
      toast.error('Error creating Product. Please try again.')
    }
  }

  const handleAddCategorySubmit = async (e) => {
    e.preventDefault()

    if (newCategoryName.trim() === '') {
      return
    }

    try {
      setIsLoading(true);
      await axiosInstance.post('/add-category', {
        name: newCategoryName,
      })
      setIsLoading(false);
      toast.success('Category Added Successfully')

      const response = await axiosInstance.get('/get-category')
      setCategories(response.data.data)

      // Update the category_name based on where it should be set
      setProductData((prevData) => {
        if (prevData.category_name === 'addCategory') {
          return {
            ...prevData,
            category_name: newCategoryName,
          }
        }
        return prevData
      })

      setIsAddingCategory(false)
      setNewCategoryName('')
    } catch (error) {
      setIsLoading(false);
      console.error('Error adding category:', error)
      toast.error('Error adding category')
    }
  }

  const handleAddColorSubmit = async () => {
    if (newColorName.trim() === '') {
      return;
    }

    try {
      setIsLoading(true);
      await axiosInstance.post('/add-color', {
        name: newColorName,
      });
      setIsLoading(false);

      toast.success('Color Added Successfully');

      const response = await axiosInstance.get('/get-color');
      setColor(response.data.data);
      fetchColorData();

      setProductData((prevData) => ({
        ...prevData,
        color_name: [...prevData.color_name, newColorName],
      }));

      setIsAddingColor(false);
      setNewColorName('');
    } catch (error) {
      setIsLoading(false);
      console.error('Error adding Color:', error);
      toast.error('Error adding Color');
    }
  };

  const generateColorOptions = () => {
    const colorOptions = (color || []).map((colors) => ({
      value: colors.name,
      label: colors.name,
    }));

    colorOptions.push({
      value: 'addColor',
      label: 'Add Color',
    });

    return colorOptions;
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  return (
    <div className="margintop">
      <Row>
        <Col xl="8" lg="8">
          <Card>
            <Card.Body>
              <div className="new-user-info">
                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Product Name:</Form.Label>
                        <Form.Control
                          type="text"
                          id="name"
                          name="name"
                          value={productData.name}
                          onChange={handleChange}
                          placeholder="Enter Product Name"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="description">
                          Product Description:
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          id="description"
                          name="description"
                          value={productData.description}
                          onChange={handleChange}
                          placeholder="Enter Product Description"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="stockQuantity">
                          Product Quantity:
                        </Form.Label>
                        <Form.Control
                          type="number"
                          id="stockQuantity"
                          name="stockQuantity"
                          value={productData.stockQuantity}
                          onChange={handleChange}
                          placeholder="Enter Product Quantity"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="size">Product Size:</Form.Label>
                        <Select
                          id="size"
                          name="size"
                          isMulti
                          value={(productData.size || []).map((size) => ({
                            value: size,
                            label: size,
                          }))}
                          onChange={(selectedOptions) => {
                            const selectedSizes = selectedOptions.map(
                              (option) => option.value,
                            )
                            setProductData((prevData) => ({
                              ...prevData,
                              size: selectedSizes,
                            }))
                          }}
                          components={animatedComponents}
                          options={[
                            { value: 'XS', label: 'XS' },
                            { value: 'S', label: 'S' },
                            { value: 'M', label: 'M' },
                            { value: 'L', label: 'L' },
                            { value: 'XL', label: 'XL' },
                            { value: 'XXL', label: '2XL' },
                            { value: '3XL', label: '3XL' },
                            { value: '4XL', label: '4XL' },
                            { value: '5XL', label: '5XL' },
                            { value: '6XL', label: '6XL' },
                            { value: '7XL', label: '7XL' },
                            { value: '8XL', label: '8XL' },
                            { value: '9XL', label: '9XL' },
                            { value: '10XL', label: '10XL' },
                            { value: 'Free Style', label: 'Free Style' },
                          ]}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="category_name">
                          Product Category:
                        </Form.Label>
                        <Form.Select
                          id="category_name"
                          name="category_name"
                          value={productData.category_name}
                          onChange={handleChange}
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        >
                          <option value="">Select Category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                          <option value="addCategory">Add Category</option>
                        </Form.Select>
                        {productData.category_name === 'addCategory' && (
                          <div>
                            <input
                              type="text"
                              style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                              }}
                              placeholder="Enter new category name"
                              value={newCategoryName}
                              onChange={(e) =>
                                setNewCategoryName(e.target.value)
                              }
                            />
                            <Button
                              type="button"
                              onClick={handleAddCategorySubmit}
                            >
                              Add
                            </Button>
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="color_name">Product Color:</Form.Label>
                        <Select
                          id="color_name"
                          name="color_name"
                          isMulti
                          value={(productData.color_name || []).map((color) => ({
                            value: color,
                            label: color,
                          }))}
                          onChange={handleColorChange}
                          components={animatedComponents}
                          options={generateColorOptions()}
                        />
                        {isAddingColor && (
                          <div>
                            <input
                              type="text"
                              style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                              }}
                              placeholder="Enter new Color Name"
                              value={newColorName}
                              onChange={(e) => setNewColorName(e.target.value)}
                            />
                            <Button type="button" onClick={handleAddColorSubmit}>
                              Add
                            </Button>
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <div className="d-flex justify-content-between">
                          <Form.Label htmlFor="product_images">
                            Product Images:
                          </Form.Label>
                          <a href='https://www.iloveimg.com/compress-image' target='_blank'><div style={{ fontSize: '14px', marginTop: '10px' }}>Compress image <span style={{ color: 'blue' }}>here...</span></div></a>
                        </div>
                        <Form.Control
                          type="file"
                          id="product_images"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleChange}
                          style={{ display: 'none' }}
                        />
                        <div
                          className="drop-container"
                          onClick={() =>
                            document.getElementById('product_images').click()
                          }
                        >
                          <div className="upload-icon">
                            <div className="icon-text">Click to upload <br />
                              <span style={{
                                color: 'red', fontSize: '14px', marginTop: '10px'
                              }}> Max image size 3 MB each</span><br />
                            </div>
                          </div>
                        </div>
                        {productData.product_images.length > 0 && (
                          <div className="preview-container d-flex flex-wrap">
                            {productData.product_images.map((file, index) => (
                              <ImagePreview
                                key={index}
                                file={file}
                                isSelected={selectedImageIndex === index}
                                onSelect={() => setSelectedImageIndex(index)}
                                onRemove={() => handleRemoveImage(index)}
                              />
                            ))}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="price">Product Price:</Form.Label>
                        <Form.Control
                          type="text"
                          id="price"
                          name="price"
                          value={productData.price}
                          onChange={handleChange}
                          placeholder="₹00.00"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="c_price">
                          Compare-at Price:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="c_price"
                          name="c_price"
                          value={productData.c_price}
                          onChange={handleChange}
                          placeholder="₹00.00"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="length">Product Length:</Form.Label>
                        <Form.Control
                          type="text"
                          id="length"
                          name="length"
                          value={productData.length}
                          onChange={handleChange}
                          placeholder="00.00"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="breadth">
                          Product Breadth:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="breadth"
                          name="breadth"
                          value={productData.breadth}
                          onChange={handleChange}
                          placeholder="00.00"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="height">
                          Product Height:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="height"
                          name="height"
                          value={productData.height}
                          onChange={handleChange}
                          placeholder="00.00"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="weight">
                          Product Weight:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          id="weight"
                          name="weight"
                          value={productData.weight}
                          onChange={handleChange}
                          placeholder="00.00"
                          style={{ background: 'rgba(4, 34, 37, 0.10)' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Button
                        type="submit"
                        className="btn btn-primary w-100 mt-20"
                      >
                        Create
                      </Button>
                    </Col>
                    {isLoading && <div style={{ position: 'fixed', top: '0%', left: '0%', background: '#00000094', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '999' }}>
                      <CircularProgress sx={{ color: '#59acff', width: '60px!important', height: '60px!important' }} />
                    </div>}
                  </Row>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AddProduct
