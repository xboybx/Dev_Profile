'use client';

import { useState, useEffect } from 'react';
import { ContactMessage } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { toast } from 'sonner';

export function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const fetchMessages = async () => {
    const response = await fetch('/api/contact');
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (message: ContactMessage) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: message.id, read: !message.read }),
      });

      if (!response.ok) throw new Error('Failed to update message');

      toast.success(`Message marked as ${!message.read ? 'read' : 'unread'}`);
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete message');

      toast.success('Message deleted successfully');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Contact Messages</CardTitle>
          {unreadCount > 0 && (
            <p className="text-sm text-slate-400 mt-1">
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-slate-400 py-8">No messages yet</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg ${
                  message.read
                    ? 'bg-slate-900/30 border-slate-800'
                    : 'bg-slate-900/50 border-cyan-500/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{message.name}</h3>
                      {!message.read && <Badge variant="default">New</Badge>}
                    </div>
                    <p className="text-sm text-slate-400">{message.email}</p>
                    <p className="text-xs text-slate-500 mt-1">{formatDate(message.created_at)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleRead(message)}
                      title={message.read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {message.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-slate-300 mb-1">
                    Subject: {message.subject}
                  </p>
                  <p className="text-sm text-slate-400 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
