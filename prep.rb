usage = '''
Usage: ruby deploy.rb [version_bump_type] [message]
- bump_type - One of "major", "minor", "patch". Determines how to increment the version number.
- message - Quote-enclosed message describing version.
- commit_message - (Opt) Quote-enclosed commit message. If not given, will default to message.
'''

type = (ARGV && ARGV[0] && ARGV[0].downcase)
message = (ARGV && ARGV[1])
commit_message = (ARGV && ARGV[2] || message)

if (!type || !message || type === '--help' || type === '-h')
  puts usage
else
  prev_line = `cat package.json | grep version`
  prev = prev_line.split(': ').last.gsub('"', '').gsub(',', '').gsub("\n", '');

  numbers = prev.split('.').map{ |n| n.to_i }
  place = ['major', 'minor', 'patch'].index(type)

  (place..numbers.length - 1).each do |n|
    if n === place
      numbers[n] = numbers[n] + 1
    else
      numbers[n] = 0
    end
  end

  new_version = numbers.join('.')

  `sed -i '' 's/"version": "[0-9]*\.[0-9]*\.[0-9]*"/"version": "#{new_version}"/g' ./package.json`
  puts "Bumped from #{prev} to #{new_version} in package.json"

  `git add .`
  `git commit -m '#{commit_message}'`
  commit = `git rev-parse --short HEAD`.strip
  puts "Committed '#{commit_message}' (#{commit})"

  `git tag 'v#{new_version}' -m '#{message}' #{commit}`
  puts "Tagged commit #{commit} as v#{new_version}"

  `git push && git push --tags`
  puts "Pushed code and tags"
end