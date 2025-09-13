'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { mockAdminSettings } from '@/lib/admin-data';
import {
  Save,
  CreditCard,
  FileText,
  Globe,
  Database,
  AlertTriangle
} from 'lucide-react';

type SettingsField = {
  label: string;
  key: keyof typeof mockAdminSettings;
  type: 'text' | 'textarea' | 'email' | 'number' | 'select' | 'switch';
  placeholder?: string;
  description?: string;
  options?: string[];
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(mockAdminSettings);

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
  };

  const settingsSections: Array<{
    title: string;
    icon: any;
    color: string;
    bgColor: string;
    fields: SettingsField[];
  }> = [
    {
      title: 'Institution Information',
      icon: Globe,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      fields: [
        {
          label: 'Institution Name',
          key: 'siteName',
          type: 'text',
          placeholder: 'Qemer University LMS'
        },
        {
          label: 'Institution Description',
          key: 'siteDescription',
          type: 'textarea',
          placeholder: 'Academic excellence through innovative learning management'
        },
        {
          label: 'Academic Affairs Email',
          key: 'contactEmail',
          type: 'email',
          placeholder: 'admin@qemer.edu'
        },
        {
          label: 'Student Support Email',
          key: 'supportEmail',
          type: 'email',
          placeholder: 'support@qemer.edu'
        }
      ]
    },
    {
      title: 'System Settings',
      icon: Database,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      fields: [
        {
          label: 'Allow Registration',
          key: 'allowRegistration',
          type: 'switch',
          description: 'Allow new users to register accounts'
        },
        {
          label: 'Email Notifications',
          key: 'emailNotifications',
          type: 'switch',
          description: 'Send system email notifications'
        },
        {
          label: 'Maintenance Mode',
          key: 'maintenanceMode',
          type: 'switch',
          description: 'Put site in maintenance mode'
        }
      ]
    },
    {
      title: 'Academic Calendar',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      fields: [
        {
          label: 'Current Academic Year',
          key: 'defaultCurrency',
          type: 'text',
          placeholder: '2024-2025',
          description: 'Current academic year'
        },
        {
          label: 'Fall Semester End',
          key: 'taxRate',
          type: 'text',
          placeholder: 'Dec 20, 2024',
          description: 'End date of fall semester'
        },
        {
          label: 'Spring Semester End',
          key: 'stripeEnabled',
          type: 'text',
          placeholder: 'May 9, 2025',
          description: 'End date of spring semester'
        },
        {
          label: 'Allow Late Enrollment',
          key: 'paypalEnabled',
          type: 'switch',
          description: 'Allow students to enroll after semester start'
        }
      ]
    },
    {
      title: 'Academic Materials Settings',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      fields: [
        {
          label: 'Max File Size (MB)',
          key: 'maxFileSize',
          type: 'number',
          placeholder: '50',
          description: 'Maximum file size for academic materials'
        },
        {
          label: 'Allowed Academic File Types',
          key: 'allowedFileTypes',
          type: 'text',
          placeholder: 'pdf,doc,docx,ppt,pptx,xls,xlsx,jpg,png,gif,mp4,avi',
          description: 'File types for syllabi, assignments, lectures, etc.'
        }
      ]
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Institution Settings</h1>
            <p className="text-gray-600 mt-1">Configure academic year, enrollment, and institutional preferences</p>
          </div>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                      <Icon className={`h-5 w-5 ${section.color}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {field.label}
                      </label>

                      {field.type === 'text' && (
                        <Input
                          value={settings[field.key] as string}
                          onChange={(e) => setSettings({...settings, [field.key]: e.target.value})}
                          placeholder={field.placeholder}
                        />
                      )}

                      {field.type === 'textarea' && (
                        <Textarea
                          value={settings[field.key] as string}
                          onChange={(e) => setSettings({...settings, [field.key]: e.target.value})}
                          placeholder={field.placeholder}
                          rows={3}
                        />
                      )}

                      {field.type === 'email' && (
                        <Input
                          type="email"
                          value={settings[field.key] as string}
                          onChange={(e) => setSettings({...settings, [field.key]: e.target.value})}
                          placeholder={field.placeholder}
                        />
                      )}

                      {field.type === 'number' && (
                        <Input
                          type="number"
                          value={settings[field.key] as number}
                          onChange={(e) => setSettings({...settings, [field.key]: parseFloat(e.target.value) || 0})}
                          placeholder={field.placeholder}
                        />
                      )}

                      {field.type === 'select' && field.options && (
                        <select
                          value={settings[field.key] as string}
                          onChange={(e) => setSettings({...settings, [field.key]: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {field.options.map((option: string) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      )}

                      {field.type === 'switch' && field.description && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{field.description}</span>
                          <Switch
                            checked={settings[field.key] as boolean}
                            onCheckedChange={(checked) => setSettings({...settings, [field.key]: checked})}
                          />
                        </div>
                      )}

                      {field.description && field.type !== 'switch' && (
                        <p className="text-xs text-gray-500">{field.description}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Maintenance Message */}
        {settings.maintenanceMode && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <CardTitle className="text-orange-800">Maintenance Mode Active</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-orange-800">
                    Maintenance Message
                  </label>
                  <Textarea
                    value={settings.maintenanceMessage}
                    onChange={(e) => setSettings({...settings, maintenanceMessage: e.target.value})}
                    placeholder="The LMS is currently under maintenance. Classes will resume shortly..."
                    className="mt-1 border-orange-300 focus:border-orange-500"
                  />
                </div>
                <Badge variant="warning" className="px-3 py-1">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Site is currently in maintenance mode
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button variant="outline">
            Reset to Defaults
          </Button>
          <Button variant="outline">
            Export Settings
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
