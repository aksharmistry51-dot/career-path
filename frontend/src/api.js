const API_BASE = 'http://localhost:8080/api'

function getToken() {
  return localStorage.getItem('token')
}

async function request(endpoint, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || 'Something went wrong')
  }

  return response.json()
}

export const api = {
  signup: (username, password) =>
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  login: (username, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  getProfile: () => request('/user/profile'),

  selectPath: (path) =>
    request('/user/select-path', {
      method: 'POST',
      body: JSON.stringify({ path }),
    }),

  getTasks: () => request('/tasks'),

  createTask: (title, topic, dayNumber) =>
    request('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, topic, dayNumber }),
    }),

  toggleTask: (id) =>
    request(`/tasks/${id}/toggle`, { method: 'PUT' }),

  addXp: (xp) =>
    request('/progress/add-xp', {
      method: 'POST',
      body: JSON.stringify({ xp }),
    }),

  updateStreak: () =>
    request('/progress/update-streak', { method: 'POST' }),

  getAchievements: () => request('/achievements'),

  unlockAchievement: (name) =>
    request('/achievements/unlock', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),
}