import React, { useState, useEffect } from 'react';
import './Goals.css';

const Goals = () => {
    const [habits, setHabits] = useState([]);
    const [goals, setGoals] = useState([]);
    const [showAddHabit, setShowAddHabit] = useState(false);
    const [showAddGoal, setShowAddGoal] = useState(false);
    const [newHabit, setNewHabit] = useState('');
    const [newGoal, setNewGoal] = useState({ title: '', deadline: '', category: 'personal' });

    // Preset habit templates
    const habitTemplates = [
        { icon: '💧', name: 'Drink 8 glasses of water', category: 'health' },
        { icon: '🧘', name: 'Meditate for 10 minutes', category: 'wellness' },
        { icon: '📖', name: 'Read for 30 minutes', category: 'personal' },
        { icon: '🏃', name: 'Exercise', category: 'health' },
        { icon: '😴', name: 'Sleep 8 hours', category: 'health' },
        { icon: '📝', name: 'Journal', category: 'wellness' },
        { icon: '🙏', name: 'Practice gratitude', category: 'wellness' },
    ];

    // Load data from localStorage
    useEffect(() => {
        const savedHabits = JSON.parse(localStorage.getItem('habits') || '[]');
        const savedGoals = JSON.parse(localStorage.getItem('goals') || '[]');
        setHabits(savedHabits);
        setGoals(savedGoals);
    }, []);

    // Save habits to localStorage
    const saveHabits = (updatedHabits) => {
        setHabits(updatedHabits);
        localStorage.setItem('habits', JSON.stringify(updatedHabits));
    };

    // Save goals to localStorage
    const saveGoals = (updatedGoals) => {
        setGoals(updatedGoals);
        localStorage.setItem('goals', JSON.stringify(updatedGoals));
    };

    // Add a new habit
    const addHabit = (habitName, icon = '✅') => {
        const newHabitObj = {
            id: Date.now(),
            name: habitName,
            icon: icon,
            streak: 0,
            lastCompleted: null,
            history: []
        };
        saveHabits([...habits, newHabitObj]);
        setNewHabit('');
        setShowAddHabit(false);
    };

    // Toggle habit completion
    const toggleHabit = (habitId) => {
        const today = new Date().toDateString();
        const updatedHabits = habits.map(habit => {
            if (habit.id === habitId) {
                const alreadyCompletedToday = habit.history.includes(today);

                if (alreadyCompletedToday) {
                    // Uncomplete today
                    return {
                        ...habit,
                        history: habit.history.filter(date => date !== today),
                        streak: Math.max(0, habit.streak - 1)
                    };
                } else {
                    // Complete today
                    const yesterday = new Date(Date.now() - 86400000).toDateString();
                    const isConsecutive = habit.history.includes(yesterday) || habit.streak === 0;

                    return {
                        ...habit,
                        history: [...habit.history, today],
                        lastCompleted: today,
                        streak: isConsecutive ? habit.streak + 1 : 1
                    };
                }
            }
            return habit;
        });
        saveHabits(updatedHabits);
    };

    // Check if habit is completed today
    const isCompletedToday = (habit) => {
        const today = new Date().toDateString();
        return habit.history.includes(today);
    };

    // Add a new goal
    const addGoal = () => {
        if (!newGoal.title) return;

        const newGoalObj = {
            id: Date.now(),
            title: newGoal.title,
            deadline: newGoal.deadline,
            category: newGoal.category,
            completed: false,
            createdAt: new Date().toISOString()
        };
        saveGoals([...goals, newGoalObj]);
        setNewGoal({ title: '', deadline: '', category: 'personal' });
        setShowAddGoal(false);
    };

    // Toggle goal completion
    const toggleGoal = (goalId) => {
        const updatedGoals = goals.map(goal =>
            goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
        );
        saveGoals(updatedGoals);
    };

    // Delete habit
    const deleteHabit = (habitId) => {
        if (window.confirm('Delete this habit?')) {
            saveHabits(habits.filter(h => h.id !== habitId));
        }
    };

    // Delete goal
    const deleteGoal = (goalId) => {
        if (window.confirm('Delete this goal?')) {
            saveGoals(goals.filter(g => g.id !== goalId));
        }
    };

    // Calculate days until deadline
    const daysUntilDeadline = (deadline) => {
        if (!deadline) return null;
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="goals-container">
            <h2 className="goals-title">🎯 Goals & Habits</h2>

            {/* Habits Section */}
            <div className="goals-section">
                <div className="section-header">
                    <h3>Daily Habits</h3>
                    <button className="add-btn" onClick={() => setShowAddHabit(!showAddHabit)}>
                        + Add Habit
                    </button>
                </div>

                {showAddHabit && (
                    <div className="add-form">
                        <h4>Choose a Habit Template</h4>
                        <div className="habit-templates">
                            {habitTemplates.map((template, index) => (
                                <button
                                    key={index}
                                    className="template-btn"
                                    onClick={() => addHabit(template.name, template.icon)}
                                >
                                    <span className="template-icon">{template.icon}</span>
                                    <span className="template-name">{template.name}</span>
                                </button>
                            ))}
                        </div>
                        <div className="custom-habit">
                            <input
                                type="text"
                                placeholder="Or create custom habit..."
                                value={newHabit}
                                onChange={(e) => setNewHabit(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && newHabit && addHabit(newHabit)}
                            />
                            <button onClick={() => newHabit && addHabit(newHabit)}>Add Custom</button>
                        </div>
                    </div>
                )}

                <div className="habits-list">
                    {habits.length === 0 ? (
                        <div className="empty-state">
                            <p>No habits yet! Add your first habit to start building consistency.</p>
                        </div>
                    ) : (
                        habits.map(habit => (
                            <div key={habit.id} className={`habit-card ${isCompletedToday(habit) ? 'completed' : ''}`}>
                                <div className="habit-checkbox" onClick={() => toggleHabit(habit.id)}>
                                    {isCompletedToday(habit) ? '✓' : ''}
                                </div>
                                <div className="habit-info">
                                    <div className="habit-name">
                                        <span className="habit-icon">{habit.icon}</span>
                                        {habit.name}
                                    </div>
                                    <div className="habit-streak">
                                        🔥 {habit.streak} day{habit.streak !== 1 ? 's' : ''} streak
                                    </div>
                                </div>
                                <button className="delete-btn" onClick={() => deleteHabit(habit.id)}>×</button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Goals Section */}
            <div className="goals-section">
                <div className="section-header">
                    <h3>Goals</h3>
                    <button className="add-btn" onClick={() => setShowAddGoal(!showAddGoal)}>
                        + Add Goal
                    </button>
                </div>

                {showAddGoal && (
                    <div className="add-form">
                        <input
                            type="text"
                            placeholder="Goal title..."
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newGoal.deadline}
                            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                        />
                        <select
                            value={newGoal.category}
                            onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                        >
                            <option value="personal">Personal</option>
                            <option value="health">Health</option>
                            <option value="career">Career</option>
                            <option value="social">Social</option>
                            <option value="learning">Learning</option>
                        </select>
                        <button onClick={addGoal}>Add Goal</button>
                    </div>
                )}

                <div className="goals-list">
                    {goals.length === 0 ? (
                        <div className="empty-state">
                            <p>No goals set yet! Create your first goal to stay motivated.</p>
                        </div>
                    ) : (
                        goals.map(goal => {
                            const daysLeft = daysUntilDeadline(goal.deadline);
                            return (
                                <div key={goal.id} className={`goal-card ${goal.completed ? 'completed' : ''}`}>
                                    <div className="goal-checkbox" onClick={() => toggleGoal(goal.id)}>
                                        {goal.completed ? '✓' : ''}
                                    </div>
                                    <div className="goal-info">
                                        <div className="goal-title">{goal.title}</div>
                                        <div className="goal-meta">
                                            <span className="goal-category">{goal.category}</span>
                                            {goal.deadline && (
                                                <span className={`goal-deadline ${daysLeft < 7 ? 'urgent' : ''}`}>
                                                    {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today!' : 'Overdue'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button className="delete-btn" onClick={() => deleteGoal(goal.id)}>×</button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Stats Section */}
            {(habits.length > 0 || goals.length > 0) && (
                <div className="stats-section">
                    <h3>📊 Your Progress</h3>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">{habits.filter(h => isCompletedToday(h)).length}/{habits.length}</div>
                            <div className="stat-label">Habits Today</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{Math.max(...habits.map(h => h.streak), 0)}</div>
                            <div className="stat-label">Best Streak</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{goals.filter(g => g.completed).length}/{goals.length}</div>
                            <div className="stat-label">Goals Complete</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goals;
