# Expense-Splitting-App-
# 💸 ExpenseEase — Trip Expense Splitter

> Track. Split. Settle. Repeat. 🚀

ExpenseEase is a lightweight web app that helps groups of friends split trip expenses fairly and calculate who owes what to whom — with zero backend needed.

---

## 🖥️ Live Demo

<!-- Replace with your GitHub Pages or deployment link -->
[View Live →](https://github.com/srkrishna871/Expense-Splitting-App-)

---

## ✨ Features

- 🧾 **Add Expenses** — Log what was spent, who paid, and how much
- ⚡ **Real-time Settlement** — Instantly calculates who owes who and how much
- 💾 **Trip Archive** — Saves past trips to local storage so history is never lost
- 📜 **Settlement Recap** — View detailed breakdowns of old trips anytime
- 🎨 **Clean UI** — Neo-brutalist design with bold cards and smooth interactions

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling (Neo-brutalist design) |
| Vanilla JavaScript | Logic & DOM manipulation |
| LocalStorage | Persistent trip history (no backend needed) |
| Google Fonts (Space Grotesk) | Typography |

---

## 📁 Project Structure

```
ExpenseEase/
│
├── index.html       # Main HTML structure
├── code.css         # All styles and design tokens
└── script.js        # App logic, settlement algorithm, storage
```

---

## 🚀 How to Run

1. Clone this repository:
```bash
git clone  https://github.com/srkrishna871/Expense-Splitting-App-
```

2. Open `index.html` in your browser — no server or install needed.

---

## 🧮 How the Split Algorithm Works

1. Collects all unique payers from the expense list
2. Calculates the **equal share** = total ÷ number of people
3. Computes each person's **balance** = amount paid − fair share
4. Uses a **greedy algorithm** to minimize the number of transactions:
   - People who paid less than their share are **debtors**
   - People who paid more are **creditors**
   - Matches the largest debtor with the largest creditor until all balances are settled

---

## 📸 Screenshots

<!-- Add your screenshots here -->
| Trip Creator | Settlement Plan |
|---|---|
| ![Add Expense]( ![alt text](image.png)) | ![Settlement](![alt text](image-1.png)) |

---

## 🔮 Future Improvements

- [ ] Add member list (not just payers)
- [ ] Support multiple currencies
- [ ] Export settlement as PDF
- [ ] Add delete/edit expense option
- [ ] Deploy with Firebase for cloud sync

---

## 👨‍💻 Author

M.SIVA RAMA KRISHNA  
[GitHub](https://github.com/srkrishna871/Expense-Splitting-App-) •  

---

## 📄 License

This project is open source.