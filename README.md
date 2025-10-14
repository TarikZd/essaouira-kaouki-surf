# Essaouira Kaouki Surf

## 🌊 Surf & Travel Booking Website

A modern, responsive website for booking surf lessons, adventure tours, and airport transfers in Essaouira, Morocco.

## ✨ Features

- **📱 Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **🎯 Interactive Forms** - Book transfers, adventures, and contact services
- **💾 JSON Storage** - All form submissions save to browser localStorage
- **✅ Form Validation** - Complete validation with user-friendly error messages
- **🎨 Modern Design** - Beautiful, professional UI with smooth animations
- **🌍 Multi-language Ready** - Easy to extend for multiple languages

## 🚀 Quick Start

1. **Open any HTML file** in your browser
2. **Fill out any form** with test data
3. **Submit** and see success confirmation
4. **Check browser console** for detailed logs
5. **View saved data** in localStorage (F12 → Application → Local Storage)

## 📋 Forms Available

### **Main Forms:**
- **Transfer Booking** - Airport & hotel transfers
- **Adventure Booking** - General adventure tours
- **Contact Form** - Customer inquiries

### **Landing Page Forms:**
- **Souks Adventure** - Traditional market tours
- **Kaouki Surf Experience** - Professional surf lessons
- **Iftane Surf & Food** - Surfing with Moroccan cuisine
- **Tafedna Experience** - Advanced surfing & seafood
- **Fishing & Food** - Traditional fishing culture
- **Coastal Villages Tour** - Berber community exploration

## 💻 Technical Details

### **Storage Methods:**
- **JSON/localStorage** (Current) - No database required
- **Supabase** (Alternative) - Change `STORAGE_METHOD` in `config.js`

### **Files Structure:**
```
essaouira-kaouki-surf/
├── index.html              # Homepage with main forms
├── contact.html           # Contact page
├── *.html                 # Landing pages
├── css/
│   └── style.css          # All styling
├── js/
│   ├── config.js          # Configuration & storage
│   └── script.js          # Form handlers & validation
└── images/                # All images
```

## 🔧 Configuration

### **Switch Storage Method:**
```javascript
// In js/config.js
const STORAGE_METHOD = 'json';    // Use localStorage
// const STORAGE_METHOD = 'supabase'; // Use Supabase
```

### **View Saved Data:**
```javascript
// In browser console
console.log(localStorage.getItem('transfers_backup'));
console.log(localStorage.getItem('adventures_backup'));
console.log(localStorage.getItem('contacts_backup'));
```

## 🌟 Key Benefits

- **✅ No Database Setup** - Works immediately
- **✅ Mobile Optimized** - Perfect on all devices
- **✅ Fast Loading** - Optimized performance
- **✅ Easy Maintenance** - Clean, organized code
- **✅ Production Ready** - Professional quality

## 📞 Contact

**Phone:** +212 628 438 838
**Email:** moorishutility@gmail.com
**Address:** 06 Rue Takadoum Lot 5, Essaouira, Morocco

---

*Built with modern web technologies for the best user experience* 🌊
