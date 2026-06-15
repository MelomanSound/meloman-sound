self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};
    event.waitUntil(
        self.registration.showNotification(data.title || 'Новая заявка!', {
            body: data.body || '',
            icon: '🎙️',
            vibrate: [200, 100, 200]
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/meloman-sound/admin.html')
    );
});
