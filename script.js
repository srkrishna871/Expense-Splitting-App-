    const DB_KEY = 'expenseEase_sqlite_sim';
        let currentExpenses = [];
        let tripHistory = JSON.parse(localStorage.getItem(DB_KEY)) || [];

        const ui = {
            tripNameInput: document.getElementById('trip-name'),
            descInput: document.getElementById('desc'),
            payerInput: document.getElementById('payer'),
            amountInput: document.getElementById('amount'),
            btnAdd: document.getElementById('add-expense'),
            list: document.getElementById('expense-list'),
            settleSec: document.getElementById('settle-section'),
            settleList: document.getElementById('settlement-list'),
            btnSave: document.getElementById('save-trip'),
            historyContainer: document.getElementById('history-container'),
            historyTitle: document.getElementById('history-title')
        };

        function init() {
            renderHistory();
            renderCurrent();
        }

        ui.btnAdd.addEventListener('click', () => {
            const desc = ui.descInput.value.trim();
            const payer = ui.payerInput.value.trim();
            const amount = parseFloat(ui.amountInput.value);

            if (!payer || isNaN(amount) || amount <= 0) return;

            currentExpenses.push({
                id: Date.now(),
                desc: desc || 'Unnamed Expense',
                payer: payer,
                amount: amount
            });

            ui.descInput.value = '';
            ui.amountInput.value = '';
            renderCurrent();
        });

        ui.btnSave.addEventListener('click', () => {
            if (currentExpenses.length === 0) return;

            const finalSettlements = getSettlementArray(currentExpenses);
            const newEntry = {
                id: Date.now(),
                name: ui.tripNameInput.value.trim() || "Quick Trip",
                total: currentExpenses.reduce((s, e) => s + e.amount, 0),
                date: new Date().toLocaleDateString(),
                settlements: finalSettlements
            };

            // Save to 'Database'
            tripHistory.unshift(newEntry);
            localStorage.setItem(DB_KEY, JSON.stringify(tripHistory));

            // Clear UI
            currentExpenses = [];
            ui.tripNameInput.value = '';
            renderCurrent();
            renderHistory();
        });

        function renderCurrent() {
            ui.list.innerHTML = '';
            if (currentExpenses.length === 0) {
                ui.settleSec.style.display = 'none';
                return;
            }
            ui.settleSec.style.display = 'block';

            currentExpenses.forEach(ex => {
                const div = document.createElement('div');
                div.className = 'expense-item';
                div.innerHTML = `
                    <div><strong>${ex.desc}</strong><br><span class="meta">Paid by ${ex.payer}</span></div>
                    <div style="text-align:right"><strong>$${ex.amount.toFixed(2)}</strong></div>
                `;
                ui.list.appendChild(div);
            });

            const steps = getSettlementArray(currentExpenses);
            renderSettlementList(steps, ui.settleList);
        }

        function getSettlementArray(expenses) {
            const people = [...new Set(expenses.map(e => e.payer))];
            if (people.length < 2) return [];

            const total = expenses.reduce((s, e) => s + e.amount, 0);
            const share = total / people.length;

            let balances = people.map(p => ({
                name: p,
                balance: expenses.filter(e => e.payer === p).reduce((s, e) => s + e.amount, 0) - share
            }));

            let debtors = balances.filter(b => b.balance < -0.01).sort((a,b) => a.balance - b.balance);
            let creditors = balances.filter(b => b.balance > 0.01).sort((a,b) => b.balance - a.balance);
            let steps = [];

            while (debtors.length && creditors.length) {
                let d = debtors[0], c = creditors[0];
                let amount = Math.min(Math.abs(d.balance), c.balance);
                steps.push({ from: d.name, to: c.name, amt: amount });

                d.balance += amount;
                c.balance -= amount;
                if (Math.abs(d.balance) < 0.01) debtors.shift();
                if (Math.abs(c.balance) < 0.01) creditors.shift();
            }
            return steps;
        }

        function renderSettlementList(steps, targetEl) {
            targetEl.innerHTML = steps.length ? '' : '<p class="meta">Add another payer to see split.</p>';
            steps.forEach(s => {
                const div = document.createElement('div');
                div.className = 'settlement-item';
                div.innerHTML = `<span>${s.from} → ${s.to}</span> <strong>$${s.amt.toFixed(2)}</strong>`;
                targetEl.appendChild(div);
            });
        }

        function renderHistory() {
            ui.historyContainer.innerHTML = '';
            ui.historyTitle.style.display = tripHistory.length ? 'block' : 'none';

            tripHistory.forEach(trip => {
                const div = document.createElement('div');
                div.className = 'history-item';
                div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center">
                        <h3>${trip.name}</h3>
                        <span class="badge">$${trip.total.toFixed(2)}</span>
                    </div>
                    <p class="meta">Saved on ${trip.date}</p>
                    <div class="history-details">
                        <strong style="font-size:0.8rem">Settlement Recap:</strong>
                        ${trip.settlements.map(s => `
                            <div class="settlement-item" style="border:none; padding:2px 0">
                                <span>${s.from} → ${s.to}</span> <span>$${s.amt.toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
                ui.historyContainer.appendChild(div);
            });
        }

        init();