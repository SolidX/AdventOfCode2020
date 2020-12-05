using System.Linq;

namespace PasswordPhilosophy
{
    internal class PasswordRecordModel
    {
        public int MinimumCount { get; set; }
        public int MaximumCount { get; set; }
        public char RequiredCharacter { get; set; }
        public string Password { get; set; }

        public bool ContainsNChars()
        {
            var instances = Password.ToCharArray().Where(c => c == RequiredCharacter).Count();
            return MinimumCount <= instances && instances <= MaximumCount;
        }

        public bool ContainsCharInOneSpecifiedPosition()
        {
            var posAValid = Password[MinimumCount - 1] == RequiredCharacter;
            var posBValid = Password[MaximumCount - 1] == RequiredCharacter;
            return posAValid ^ posBValid;
        }
    }
}