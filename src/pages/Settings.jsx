import { useState } from 'react';
import { Save, Loader2, Bell, Shield, Palette, Globe, Key } from 'lucide-react';

const Settings = () => {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    appName: 'Thaedal',
    appNameTamil: 'தேடல்',
    supportEmail: 'support@thaedal.com',
    supportPhone: '+91 98765 43210',
    trialDays: 7,
    enableTrial: true,
    enableNotifications: true,
    maintenanceMode: false,
    razorpayKey: 'rzp_test_xxxxx',
    razorpaySecret: '••••••••',
    fcmServerKey: '••••••••••••',
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment', icon: Key },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Configure your platform settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 font-semibold rounded-xl hover:from-gold-500 hover:to-gold-600 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30'
                  : 'text-gray-400 hover:bg-navy-700 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 glass rounded-2xl p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">General Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    App Name (English)
                  </label>
                  <input
                    type="text"
                    value={settings.appName}
                    onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    App Name (Tamil)
                  </label>
                  <input
                    type="text"
                    value={settings.appNameTamil}
                    onChange={(e) => setSettings({ ...settings, appNameTamil: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white font-tamil focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Support Phone
                  </label>
                  <input
                    type="text"
                    value={settings.supportPhone}
                    onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="border-t border-navy-700 pt-6">
                <h3 className="text-md font-medium text-white mb-4">Trial Settings</h3>
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableTrial}
                      onChange={(e) => setSettings({ ...settings, enableTrial: e.target.checked })}
                      className="w-5 h-5 rounded border-navy-600 bg-navy-700 text-gold-400"
                    />
                    <span className="text-gray-300">Enable Free Trial</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Trial Duration:</span>
                    <input
                      type="number"
                      value={settings.trialDays}
                      onChange={(e) => setSettings({ ...settings, trialDays: parseInt(e.target.value) })}
                      className="w-20 px-3 py-2 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                    />
                    <span className="text-gray-400">days</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Notification Settings</h2>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-navy-700/50 rounded-xl cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Push Notifications</p>
                    <p className="text-gray-400 text-sm">Send push notifications to users</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.enableNotifications}
                    onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                    className="w-5 h-5 rounded border-navy-600 bg-navy-700 text-gold-400"
                  />
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    FCM Server Key
                  </label>
                  <input
                    type="password"
                    value={settings.fcmServerKey}
                    onChange={(e) => setSettings({ ...settings, fcmServerKey: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Payment Settings</h2>
              
              <div className="p-4 bg-gold-400/10 border border-gold-400/30 rounded-xl">
                <p className="text-gold-400 text-sm">
                  ⚠️ Keep your payment credentials secure. Never share them publicly.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Razorpay Key ID
                  </label>
                  <input
                    type="text"
                    value={settings.razorpayKey}
                    onChange={(e) => setSettings({ ...settings, razorpayKey: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Razorpay Secret
                  </label>
                  <input
                    type="password"
                    value={settings.razorpaySecret}
                    onChange={(e) => setSettings({ ...settings, razorpaySecret: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Security Settings</h2>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-navy-700/50 rounded-xl cursor-pointer">
                  <div>
                    <p className="text-white font-medium">Maintenance Mode</p>
                    <p className="text-gray-400 text-sm">Temporarily disable the app for users</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="w-5 h-5 rounded border-navy-600 bg-navy-700 text-gold-400"
                  />
                </label>

                <div className="p-4 bg-navy-700/50 rounded-xl">
                  <h3 className="text-white font-medium mb-2">Change Admin Password</h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    />
                    <button className="px-4 py-2 bg-gold-400 text-navy-900 font-semibold rounded-xl hover:bg-gold-500">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

