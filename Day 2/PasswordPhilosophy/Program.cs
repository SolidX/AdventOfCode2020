using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace PasswordPhilosophy
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Day 02 -- Password Philosophy");
            var lines = File.ReadAllLines("input");
            var records = lines.Select(TryParse).ToList();

            //var x = new PasswordRecordModel()
            //{
            //    MinimumCount = 2,
            //    MaximumCount = 6,
            //    RequiredCharacter = 'w',
            //    Password = "wkwwwfwwpvw"
            //};

            //var y = x.ContainsCharInOneSpecifiedPosition();

            SolvePart1(records);
            SolvePart2(records);
        }

        public static PasswordRecordModel TryParse(string s)
        {
            var exp = new Regex(@"([0-9]+)\-([0-9]+)\s([A-Za-z]):\s([A-Za-z0-9]+)", RegexOptions.Compiled);
            var matches = exp.Matches(s);

            if (matches.Count > 0)
            {
                foreach (Match match in matches)
                    return new PasswordRecordModel()
                    {
                        MinimumCount = Int32.Parse(match.Groups[1].Value),
                        MaximumCount = Int32.Parse(match.Groups[2].Value),
                        RequiredCharacter = Char.Parse(match.Groups[3].Value),
                        Password = match.Groups[4].Value
                    };
            }

            return null;
        }

        public static void SolvePart1(IEnumerable<PasswordRecordModel> records)
        {
            Console.WriteLine("Part 1");
            var validPasswords = records.Count(x => x.ContainsNChars());
            Console.WriteLine("{0} valid password(s) found.", validPasswords);
            Console.WriteLine();
        }

        public static void SolvePart2(IEnumerable<PasswordRecordModel> records)
        {
            Console.WriteLine("Part 2");
            var validPasswords = records.Count(x => x.ContainsCharInOneSpecifiedPosition());
            Console.WriteLine("{0} valid password(s) found.", validPasswords);
            Console.WriteLine();
        }
    }
}
