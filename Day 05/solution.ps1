# Loading boarding Passes
$boardingPasses = Get-Content -Path .\input

#Parse Passes
function Decode-SeatNumber {
	param(
		[string]
		[Parameter(Mandatory = $true, Position=0)]
		$seatCode,
		[int]
		[Parameter(Mandatory = $true, Position=1)]
		$seatsAvailable
	)
	
	$seatCodeParts = $seatCode.ToCharArray();
	
	$x = 0;
	$y = $seatsAvailable;
	$windowSize = $seatsAvailable;
	
	$seatCodeParts | ForEach-Object -Process {
		$windowSize = [int]([int]($y - $x) / 2);
		$midpoint = $x + $windowSize;
		
		if ($_ -eq 'R') {
			$x = $midpoint;
			$y = $x + $windowSize;
		}
		if ($_ -eq 'L') {
			$y = $midpoint;
			$x = $y - $windowSize;
		}
	}
	
	return $x;
}

function Decode-RowNumber {
	param(
		[string]
		[Parameter(Mandatory = $true, Position=0)]
		$rowCode,
		[int]
		[Parameter(Mandatory = $true, Position=1)]
		$rowsAvailable
	)
	
	$rowCodeParts = $rowCode.ToCharArray();
	
	$x = 0;
	$y = $rowsAvailable;
	$windowSize = $rowsAvailable;
	
	$rowCodeParts | ForEach-Object -Process {
		$windowSize = [int]([int]($y - $x) / 2);
		$midpoint = $x + $windowSize;
		
		if ($_ -eq 'B') {
			$x = $midpoint;
			$y = $x + $windowSize;
		}
		if ($_ -eq 'F') {
			$y = $midpoint;
			$x = $y - $windowSize;
		}
	}
	
	return $x;
}

function Get-SeatId {
	param(
		[int]
		[Parameter(Mandatory = $true, Position=0)]
		$rowNum,
		[int]
		[Parameter(Mandatory = $true, Position=1)]
		$seatNum
	)
	
	return $rowNum * 8 + $seatNum;
}

function Get-BoardingPasses {
	param(
		[string[]]
		[Parameter(Mandatory = $true, Position=0)]
		$boardingPasses
	)

	[System.Collections.ArrayList]$decodedPasses = @()
	$rowsAvailable = 128;
	$seatsAvailable = 8;

	$boardingPasses | ForEach-Object -Process {
		$rowCode = $_.Substring(0, 7);
		$seatCode = $_.Substring(7, 3);
		
		$seatNumber = Decode-SeatNumber -SeatCode $seatCode -SeatsAvailable $seatsAvailable
		$rowNumber = Decode-RowNumber -RowCode $rowCode -RowsAvailable $rowsAvailable
		$seatId = Get-SeatId -RowNum $rowNumber -SeatNum $seatNumber
		
		Write-Host "Ticket Code: $_ (Row: $rowNumber, Seat: $seatNumber, SID: $seatId)"
		
		$obj = [PSCustomObject]@{
			RowNum = $rowNumber
			SeatNum = $seatNumber
			SeatId = $seatId
		}
		$decodedPasses.Add($obj)
	}
	
	return $decodedPasses;
}

$seatsOnFlight = Get-BoardingPasses -BoardingPasses $boardingPasses

#Solve Part 1
$highestSeatId = 0;

$seatsOnFlight | ForEach-Object -Process {
	if ($_.SeatId -gt $highestSeatId) {
		$highestSeatId = $_.SeatId;
	}
}

Write-Host "Highest Seat Number is: $highestSeatId"

#Solve Part 2
$fullRowStats = ($seatsOnFlight | Measure-Object -Property RowNum -Maximum -Minimum)

for ($i = $fullRowStats.Minimum + 1; $i -lt $fullRowStats.Maximum; $i++) {
	$rowSeats = ($seatsOnFlight | where { $_.RowNum -eq $i });
	if ($rowSeats.Count -ne 8) {
		Write-Host "Row $i has at least one open seat."
		
		for ($j = 0; $j -lt 8; $j++) {
			if (($rowSeats | where { $_.SeatNum -eq $j }).Count -eq 0) {
				$sid = Get-SeatId -RowNum $i -SeatNum $j
				Write-Host "Row $i Seat $j (SID: $sid) is free."
			}
		}
	}
}
