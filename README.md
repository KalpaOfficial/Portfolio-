# SLIIT Undergraduate Portfolio — Home

This is a minimal responsive portfolio homepage intended for an undergraduate student at SLIIT. It includes sections for hero, about, projects, skills, and contact.

Files added
- `home.html` — main page (open this in your browser)
- `styles.css` — styles and responsive layout
- `script.js` — small JavaScript for mobile nav, copy-email, and the contact form stub

How to view locally
1. Open `home.html` in your browser (double-click or right-click > Open with).

Customization notes
- Replace "Your Name" and `your.email@domain.com` with your real name and email.
- Replace the project placeholders in the Projects section with real project descriptions and links.
- To add a photo: replace the SVG avatar in `home.html` with an `<img src="your-photo.jpg" alt="Your photo">` and place the image file in the same folder.
- To send messages from the contact form, wire the form up to an email service or server endpoint and update `handleContact` in `script.js` to POST the form data.

Theme (dark / light)
- The page includes a theme toggle button in the top-left header. Your selected theme is saved to localStorage so it persists across visits.
- The site also respects the system color-scheme preference on first load if no saved preference exists.

Deployment
- You can publish this folder on GitHub Pages by pushing it to a repository and enabling Pages on the main branch.

Next improvements (optional)
- Add a projects detail page or modal with screenshots
- Add resume/CV download link
- Add analytics or contact form backend
- Improve accessibility details (aria labels, keyboard focus order)

If you'd like, I can:
- Customize the copy and color scheme to match SLIIT branding precisely
- Add a photo and example project content if you provide them
- Create a simple GitHub Pages deployment guide and a resume download button
