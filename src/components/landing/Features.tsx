const features = [
  {
    title: 'Task Organization',
    description: 'Keep your tasks organized with custom categories and projects.',
    icon: '📋',
  },
  {
    title: 'Priority Management',
    description: 'Set priorities and due dates to stay on top of important tasks.',
    icon: '⭐',
  },
  {
    title: 'Team Collaboration',
    description: 'Share tasks and projects with team members for better collaboration.',
    icon: '👥',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your progress with visual dashboards and reports.',
    icon: '📊',
  },
];

export default function Features() {
  return (
    <div id="features" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to stay productive
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our comprehensive task management solution provides all the tools you need to organize, track, and complete your tasks efficiently.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.title} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-2xl">
                  {feature.icon}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 