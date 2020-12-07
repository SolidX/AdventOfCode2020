Imports System.IO

'Note: I don't actaully know VB, but this is .NET enough and cursed enough to work
Module Program
    Sub Main(args As String())
        Console.WriteLine("Day 06 -- Custom Customs")

        Dim rawDeclarations As String()
        rawDeclarations = File.ReadAllLines("input")

        'Part 1
        Dim groupedDeclarations As List(Of HashSet(Of Char))
        groupedDeclarations = GroupTravellerDeclarationsByBoardingGroup(rawDeclarations)
        SolvePart1(groupedDeclarations)

        'Part 2
        Dim groupedCommonDeclarations As List(Of HashSet(Of Char))
        groupedCommonDeclarations = GroupTravellerDeclarationsByConsensus(rawDeclarations)
        SolvePart2(groupedCommonDeclarations)
    End Sub

    Function GroupTravellerDeclarationsByBoardingGroup(rawDeclarations As String()) As List(Of HashSet(Of Char))
        Dim declarationsByGroup As New List(Of HashSet(Of Char))
        Dim currGroupDeclaration As New HashSet(Of Char)

        For Each declaration As String In rawDeclarations
            If declaration.Trim().Length = 0 Then
                declarationsByGroup.Add(currGroupDeclaration.ToHashSet())
                currGroupDeclaration.Clear()
                Continue For
            End If

            Dim travellerDeclared = declaration.Trim().ToCharArray().Distinct().ToList()
            currGroupDeclaration.UnionWith(travellerDeclared)
        Next

        Return declarationsByGroup
    End Function

    Sub SolvePart1(groupDeclarations As List(Of HashSet(Of Char)))
        Console.WriteLine("Part 1")
        Console.WriteLine("======")

        Dim sum As Integer
        sum = groupDeclarations.Select(Function(x) x.Count()).Sum()

        Console.WriteLine("The sum of all group declarations is " + sum.ToString())
        Console.WriteLine()
    End Sub

    Function GroupTravellerDeclarationsByConsensus(rawDeclarations As String()) As List(Of HashSet(Of Char))
        Dim declarationsByGroup As New List(Of HashSet(Of Char))
        Dim currGroupDeclaration As New HashSet(Of Char)

        Dim resetGroup As Boolean
        resetGroup = True

        For Each declaration As String In rawDeclarations
            If declaration.Trim().Length = 0 Then
                declarationsByGroup.Add(currGroupDeclaration.ToHashSet())
                currGroupDeclaration.Clear()
                resetGroup = True
                Continue For
            End If

            Dim travellerDeclared = declaration.Trim().ToCharArray().Distinct().ToList()

            If currGroupDeclaration.Count = 0 And resetGroup = True Then
                currGroupDeclaration = travellerDeclared.ToHashSet()
                resetGroup = False
            Else
                currGroupDeclaration.IntersectWith(travellerDeclared)
            End If
        Next

        Return declarationsByGroup
    End Function

    Sub SolvePart2(groupDeclarations As List(Of HashSet(Of Char)))
        Console.WriteLine("Part 2")
        Console.WriteLine("======")

        Dim sum As Integer
        sum = groupDeclarations.Select(Function(x) x.Count()).Sum()

        Console.WriteLine("The sum of all declarations where the entire group has made the same declaration is " + sum.ToString())
        Console.WriteLine()
    End Sub
End Module
