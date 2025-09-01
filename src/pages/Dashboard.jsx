// src/pages/Dashboard.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  CalendarDaysIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { 
  CheckCircleIcon as CheckCircleIconSolid,
  ClockIcon as ClockIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid
} from '@heroicons/react/24/solid';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in progress').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
    const overdueTasks = tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      return dueDate < today && task.status !== 'completed';
    }).length;

    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks * 100).toFixed(1) : 0;
    const productivityScore = totalTasks > 0 ? Math.min(100, (completedTasks * 1.5 + inProgressTasks * 0.8) / totalTasks * 100).toFixed(0) : 0;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      highPriorityTasks,
      overdueTasks,
      completionRate,
      productivityScore
    };
  }, [tasks]);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, filterStatus, filterPriority]);

  // Get priority color and icon
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          color: 'text-red-400',
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          icon: ExclamationTriangleIconSolid,
          gradient: 'from-red-500 to-pink-500'
        };
      case 'medium':
        return {
          color: 'text-orange-400',
          bg: 'bg-orange-500/20',
          border: 'border-orange-500/30',
          icon: ClockIconSolid,
          gradient: 'from-orange-500 to-yellow-500'
        };
      case 'low':
        return {
          color: 'text-green-400',
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          icon: CheckCircleIconSolid,
          gradient: 'from-green-500 to-emerald-500'
        };
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/30',
          icon: ClockIconSolid,
          gradient: 'from-gray-500 to-slate-500'
        };
    }
  };

  // Get status configuration
  const getStatusConfig = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-green-400',
          bg: 'bg-green-500/20',
          border: 'border-green-500/30',
          icon: CheckCircleIconSolid,
          label: 'Completed'
        };
      case 'in progress':
        return {
          color: 'text-blue-400',
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/30',
          icon: ClockIconSolid,
          label: 'In Progress'
        };
      case 'pending':
        return {
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/30',
          icon: ExclamationTriangleIconSolid,
          label: 'Pending'
        };
      default:
        return {
          color: 'text-gray-400',
          bg: 'bg-gray-500/20',
          border: 'border-gray-500/30',
          icon: ClockIconSolid,
          label: 'Unknown'
        };
    }
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, gradient, trend, trendValue }) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" 
           style={{ background: `linear-gradient(135deg, ${gradient})` }} />
      
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <p className="text-white/80 text-sm font-medium">{title}</p>
              {trend && (
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                  trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {trend === 'up' ? <TrendingUpIcon className="h-3 w-3" /> : <TrendingDownIcon className="h-3 w-3" />}
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            {subtitle && <p className="text-white/60 text-sm">{subtitle}</p>}
          </div>
          
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        
        {/* Progress bar for completion rate */}
        {title.includes('Completion') && (
          <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out`}
              style={{ width: `${value}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );

  const TaskCard = ({ task, index }) => {
    const priorityConfig = getPriorityConfig(task.priority);
    const statusConfig = getStatusConfig(task.status);
    const PriorityIcon = priorityConfig.icon;
    const StatusIcon = statusConfig.icon;

    return (
      <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
           style={{ animationDelay: `${index * 100}ms` }}>
        
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${priorityConfig.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
        
        <div className="relative">
          {/* Header with priority and status */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-xl ${priorityConfig.bg} ${priorityConfig.border} border`}>
                <PriorityIcon className={`h-4 w-4 ${priorityConfig.color}`} />
              </div>
              <div className={`px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}>
                <div className="flex items-center space-x-1">
                  <StatusIcon className={`h-3 w-3 ${statusConfig.color}`} />
                  <span className={`text-xs font-medium ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300">
                <EyeIcon className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-300">
                <PencilIcon className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-300">
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title and description */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-white/70 text-sm mb-4 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Progress bar for in-progress tasks */}
          {task.status === 'in progress' && task.progress && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer with due date and assignee */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {task.dueDate && (
              <div className="flex items-center space-x-2 text-white/60">
                <CalendarDaysIcon className="h-4 w-4" />
                <span className="text-xs">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            )}
            
            {task.assignee && (
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {task.assignee.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-white/60">{task.assignee}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      
      
      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
              Dashboard Overview
            </h1>
            <p className="text-white/60 text-lg">
              Welcome back! Here's what's happening with your projects today.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2">
              <PlusIcon className="h-5 w-5" />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            subtitle={`${stats.pendingTasks} pending`}
            icon={ChartBarIcon}
            gradient="from-blue-500 to-purple-600"
            trend="up"
            trendValue="12%"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgressTasks}
            subtitle={`${stats.highPriorityTasks} high priority`}
            icon={ClockIcon}
            gradient="from-orange-500 to-red-500"
            trend="up"
            trendValue="8%"
          />
          <StatCard
            title="Completed"
            value={stats.completedTasks}
            subtitle={`${stats.completionRate}% completion rate`}
            icon={CheckCircleIcon}
            gradient="from-green-500 to-emerald-500"
            trend="up"
            trendValue="15%"
          />
          <StatCard
            title="Productivity Score"
            value={`${stats.productivityScore}%`}
            subtitle={stats.overdueTasks > 0 ? `${stats.overdueTasks} overdue` : 'On track'}
            icon={stats.productivityScore > 80 ? RocketLaunchIcon : stats.productivityScore > 60 ? LightBulbIcon : FireIcon}
            gradient={stats.productivityScore > 80 ? "from-purple-500 to-pink-500" : stats.productivityScore > 60 ? "from-yellow-500 to-orange-500" : "from-red-500 to-pink-500"}
            trend={stats.productivityScore > 70 ? "up" : "down"}
            trendValue="5%"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 min-w-[300px]"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-white/10 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  List
                </button>
              </div>
              
              <div className="text-white/60 text-sm">
                {filteredTasks.length} of {tasks.length} tasks
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="space-y-6">
          {status === 'loading' && (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin animation-delay-200"></div>
              </div>
            </div>
          )}

          {status === 'failed' && (
            <div className="bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 text-center">
              <ExclamationTriangleIcon className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-300 text-lg font-medium mb-2">Oops! Something went wrong</p>
              <p className="text-red-400 text-sm">{error}</p>
              <button 
                onClick={() => dispatch(fetchTasks())}
                className="mt-4 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {status === 'succeeded' && filteredTasks.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredTasks.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
              ))}
            </div>
          ) : status === 'succeeded' && filteredTasks.length === 0 && tasks.length > 0 ? (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
              <FunnelIcon className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/80 text-lg font-medium mb-2">No tasks match your filters</p>
              <p className="text-white/60 text-sm mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('all');
                  setFilterPriority('all');
                }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : status === 'succeeded' && tasks.length === 0 && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
              <SparklesIcon className="h-20 w-20 text-purple-400 mx-auto mb-6 animate-pulse" />
              <p className="text-white/80 text-xl font-medium mb-3">Ready to get started?</p>
              <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
                Create your first task to begin organizing your work and boost your productivity!
              </p>
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2 mx-auto">
                <PlusIcon className="h-6 w-6" />
                <span>Create Your First Task</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;