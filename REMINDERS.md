REMINDERS — Push project to GitHub

Yeh file simple steps deti hai taaki aap apne project ko GitHub repo mein push kar saken.

Important: Push karne ke liye aapke local Git credentials chahiye (HTTPS token ya SSH key).

1) Remote set karne aur push karne ke commands (copy-paste in project root):

```bash
# agar git init nahi hua hai to
git init

# agar remote origin pehle se hai aur update karna ho to
git remote remove origin || true

# apni GitHub repo URL yahan dalen (aapka repo):
git remote add origin https://github.com/Thakar1608/LOGIN-SYSTEM-WITH-BLOG-PROJECT.git

# add, commit aur push
git add .
git commit -m "Initial commit: add project"

# default branch ko main set karke push karein
git branch -M main
git push -u origin main
```

2) Agar HTTPS push kar rahe hain to Git aapse username/password ya personal access token (PAT) maang sakta hai. Recommended:
- GitHub par Personal Access Token banayein (Settings → Developer settings → Personal access tokens) aur `repo` scope dein.
- Fir jab prompt aaye, username = GitHub username, password = PAT.

3) SSH method use karna zyada aasaan hota hai (agar pehle se setup hai):
- Local machine par SSH key generate karein (`ssh-keygen`) aur public key GitHub account me add karein (Settings → SSH and GPG keys).
- Fir remote URL ko SSH se set karein: `git remote set-url origin git@github.com:Thakar1608/LOGIN-SYSTEM-WITH-BLOG-PROJECT.git`
- Push karen: `git push -u origin main`

4) Agar aap chahen to main yahan se bhi push kar dunga — lekin mujhe aapke credentials provide na karen; agar aap terminal me mujhe allow karenge to main commands chalakar result bata dunga.

Koi dikkat aaye to bataiye, main aapko step-by-step guide kar dunga.