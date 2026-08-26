# Nikos Zevgolis | Portfolio

Personal portfolio for Nikos Zevgolis, a theoretical mathematics graduate focused on data science and backend development.

## Live website

<https://nzevgolisda.github.io/>

## About this project

This is a responsive static website built with plain HTML, CSS, and JavaScript. It includes:

- A responsive portfolio layout with light and dark themes
- About, experience, skills, projects, and contact sections
- A live feed of public repositories from the GitHub API
- A downloadable CV and a Formspree contact form
- A custom 404 page and sitemap for GitHub Pages

## Run locally

From the project directory, start a local server:

```bash
python -m http.server 8000
```

Open <http://localhost:8000> in a browser.

## Publish on GitHub Pages

For the user-site URL above, the repository must be named `nzevgolisda.github.io`.

For a first upload, create the empty repository on GitHub, then run these commands from this directory:

```bash
git init -b main
git add .
git commit -m "Create portfolio website"
git remote add origin https://github.com/nzevgolisda/nzevgolisda.github.io.git
git push -u origin main
```

Then open **Settings > Pages**, choose **Deploy from a branch**, select the `main` branch and `/ (root)`, and save. GitHub Pages will publish the site after the deployment completes.

## Project structure

```text
index.html                         Main portfolio page
css/                               Site styles
js/                                Site behavior and GitHub feed
cv.zevgolis-nikolaos.20260826.pdf Downloadable CV
404.html                           GitHub Pages not-found page
robots.txt                         Crawler instructions
sitemap.xml                        Search engine sitemap
```

## Notes

The repository feed uses GitHub's unauthenticated public API. GitHub may temporarily rate-limit requests, in which case the profile link remains available.

## License

This project is licensed under the [MIT License](LICENSE).
