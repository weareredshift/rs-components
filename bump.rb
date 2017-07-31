usage = '''
Usage: ruby bump.rb [bump_type]
- bump_type - (default "patch") One of "major", "minor", "patch". Determines how to increment the version number.
'''

type = (ARGV && ARGV[0] && ARGV[0].downcase) || "patch"
if (type === '--help' || type === '-h')
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
  puts "Bumped from #{prev} to #{new_version}"

  `sed -i '' 's/"version": "[0-9]*\.[0-9]*\.[0-9]*"/"version": "#{new_version}"/g' ./package.json`
end