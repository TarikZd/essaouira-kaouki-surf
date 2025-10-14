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

### **Storage Method:**
- **JSON Files + localStorage** - No database required
- **9 JSON files** for different form types
- **Automatic localStorage backup** for all submissions

### **Files Structure:**
```
essaouira-kaouki-surf/
├── index.html              # Homepage with main forms
├── contact.html           # Contact page
├── *.html                 # Landing pages (9 total)
├── css/
│   └── style.css          # All styling
├── js/
│   ├── config.js          # JSON storage functions
│   └── script.js          # Form handlers & validation
├── data/
│   ├── transfers.json     # Transfer bookings
│   ├── adventures.json    # General adventures
│   ├── contacts.json      # Contact messages
│   ├── souks.json         # Souks adventures
│   ├── kaouki.json        # Kaouki surf
│   ├── iftane.json        # Iftane surf & food
│   ├── tafedna.json       # Tafedna experiences
│   ├── fishing.json       # Fishing experiences
│   └── coastal.json       # Coastal village tours
└── images/                # All images (6 files)
```

## 🔧 Configuration

### **Storage Configuration:**
```javascript
// In js/config.js
const STORAGE_METHOD = 'json'; // JSON storage only
```

### **View Saved Data:**
```javascript
// In browser console - localStorage backups
console.log(localStorage.getItem('transfers_backup'));
console.log(localStorage.getItem('adventures_backup'));
console.log(localStorage.getItem('contacts_backup'));

// JSON files are in the data/ folder
// Each file contains an array of submissions
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
