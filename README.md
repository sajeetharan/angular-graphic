# 🅰️ Angular Visual Storybook

Learn Angular through beautiful, interactive infographics! This static website provides a comprehensive visual guide to Angular development, perfect for developers who want to understand Angular concepts through engaging visual content.

## 🌟 Features

- **📚 26 Comprehensive Topics**: From Angular Overview to AI Integration
- **🎨 Beautiful Design**: Modern, responsive UI with smooth animations
- **🔒 Image Protection**: Multiple layers of protection to prevent unauthorized downloading
- **📱 Mobile Friendly**: Fully responsive design that works on all devices
- **♿ Accessible**: WCAG-compliant with keyboard navigation support
- **🚀 Performance Optimized**: Fast loading with intersection observers and lazy loading
- **🔍 Search Functionality**: Quick search through topics in the sidebar
- **📊 Progress Tracking**: Visual progress bar as you scroll through content

## 🛠️ Technologies Used

- Pure HTML5, CSS3, and JavaScript (No frameworks required!)
- CSS Grid & Flexbox for responsive layouts
- Intersection Observer API for scroll detection
- Modern ES6+ JavaScript features

## 📂 Project Structure

```
angular-graphic/
├── index.html          # Main HTML file with all content
├── styles.css          # Complete styling and responsive design
├── script.js           # Interactive features and image protection
├── README.md           # This file
└── *.jpg              # 26 Angular infographic images
```

## 🚀 Quick Start

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/AzureCosmosDB/angular-graphic.git
   cd angular-graphic
   ```

2. Open the website:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using VS Code
     # Install "Live Server" extension and click "Go Live"
     ```

3. Visit `http://localhost:8000` in your browser

## 🌐 Deploying to GitHub Pages

### Method 1: Using GitHub Web Interface

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: Angular Visual Storybook"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be available at: `https://yourusername.github.io/angular-graphic/`

### Method 2: Using GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### Custom Domain (Optional)

1. Add a `CNAME` file with your domain:
   ```
   www.yourdomain.com
   ```

2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `yourusername.github.io`

## 🔒 Image Protection Features

The website implements multiple layers of image protection:

1. **Right-Click Prevention**: Context menu disabled on images
2. **Drag-and-Drop Blocking**: Images cannot be dragged
3. **Keyboard Shortcut Blocking**: Common save shortcuts are intercepted
4. **CSS Protection**: User-select and drag properties disabled
5. **Visual Feedback**: Warning overlay when protection is triggered
6. **Developer Tools Awareness**: Key shortcuts monitored (informational)
7. **Mobile Long-Press Protection**: Touch events handled to prevent saving

> **Note**: While these measures significantly deter casual downloading, determined users with technical knowledge can still capture content. These protections are meant to prevent accidental or casual downloading.

## 📖 Content Topics

The storybook covers all major Angular topics from angular.dev:

- Overview & Essentials
- Installation & Setup
- Components & Templates
- Directives & Dependency Injection
- Signals & Routing
- Forms & HTTP
- Testing & Animations
- Accessibility & Performance
- Security & SSR
- CLI & Dev Tools
- Style Guide & Libraries
- Drag & Drop
- Internationalization
- AI Integration
- Keeping Up to Date

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #dd0031;      /* Angular red */
    --secondary-color: #c3002f;    /* Darker red */
    --accent-color: #0066ff;       /* Blue accent */
    /* ... more variables */
}
```

### Content

Edit `index.html` to modify:
- Section descriptions
- Topic explanations
- Links and references

### Images

Replace the `.jpg` files with your own infographics. Maintain the naming convention:
- `angular_overview.jpg`
- `angular_components.jpg`
- etc.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Content structure inspired by [angular.dev](https://angular.dev)
- Infographics created for educational purposes
- Built with ❤️ for the Angular community

## 📞 Support

If you have any questions or need help with deployment:

1. Check the [GitHub Pages Documentation](https://docs.github.com/en/pages)
2. Open an issue in this repository
3. Visit the [Angular Community](https://angular.io/resources)

## 🚀 Live Demo

Once deployed to GitHub Pages, your site will be available at:
`https://azurecosmosdb.github.io/angular-graphic/`

---

**Built with 🅰️ Angular love | Educational Resource for Developers**