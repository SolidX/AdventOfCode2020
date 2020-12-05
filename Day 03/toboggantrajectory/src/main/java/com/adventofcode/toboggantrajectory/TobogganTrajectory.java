package com.adventofcode.toboggantrajectory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

/**
 *
 * @author SolidX
 */
public class TobogganTrajectory {
    public static void main(String[] args) {
        try {
            ArrayList<String> map = LoadMap();
            solvePart1(map);
            solvePart2(map);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }        
        
        System.exit(0);
    }
    
    public static ArrayList<String> LoadMap() throws IOException {
        System.out.println("Loading map...");
        
        ArrayList<String> map = new ArrayList<>();
        
        InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream("maps/input.map"); 
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String currLine;
        while ((currLine = br.readLine()) != null) {
            map.add(currLine);
            System.out.println(currLine);
        }
        
        return map;
    }
    
    public static int traverse(ArrayList<String> map, int diffX, int diffY) {
        int mapWidth = map.get(0).length();
            
        int posX = 0;
        int posY = 0;

        int treeCount = 0;
        
        while (posY < map.size()) {
            //Check if this is a tree
            if (map.get(posY).charAt(transformXCoord(posX, mapWidth)) == '#')
                treeCount++;
            
            //Update position
            posX += diffX;
            posY += diffY;
        }
        
        return treeCount;
    }
    
    public static int transformXCoord(int rawX, int mapWidth) {
        if (rawX < mapWidth)
            return rawX;
        return rawX % mapWidth;
    }
    
    public static void solvePart1(ArrayList<String> map) {
        System.out.println("Part 1");
        System.out.println("------");
        
        int treeCount = traverse(map, 3, 1);
        System.out.println("Traversed through " + treeCount + " trees.");
        System.out.println();
    }
    
    public static void solvePart2(ArrayList<String> map) {
        System.out.println("Part 2");
        System.out.println("------");
        
        int treeCount1 = traverse(map, 1, 1);
        System.out.println("Traveling at slope (1,1) you traversed through " + treeCount1 + " trees.");
        int treeCount2 = traverse(map, 3, 1);
        System.out.println("Traveling at slope (3,1) you traversed through " + treeCount2 + " trees.");
        int treeCount3 = traverse(map, 5, 1);
        System.out.println("Traveling at slope (5,1) you traversed through " + treeCount3 + " trees.");
        int treeCount4 = traverse(map, 7, 1);
        System.out.println("Traveling at slope (7,1) you traversed through " + treeCount4 + " trees.");
        int treeCount5 = traverse(map, 1, 2);
        System.out.println("Traveling at slope (1,2) you traversed through " + treeCount5 + " trees.");
        
        long treeMultiplier = (long)treeCount1 * (long)treeCount2 * (long)treeCount3 * (long)treeCount4 * (long)treeCount5;
        System.out.println("If you multiplied them all together that'd be " + treeMultiplier + " trees.");
        
        System.out.println();
    }
}
