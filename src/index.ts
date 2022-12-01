// "use strict";

import {FSFile, SizeFilter, ExtensionFilter, Directory, SearchCommand} from './filesearch';

// create files

const file1 = new FSFile("file1.txt",10);
const file2 = new FSFile("file2.txt",100);

const dir = new Directory("/");

const movie1 = new FSFile("movie1.mp4",200000);
const movie2 = new FSFile("movie2.mp4",100000);
const movie3 = new FSFile("movie3.mp4",500000);

const nestedDir = new Directory("movies");
nestedDir.addEntity(movie1);
nestedDir.addEntity(movie2);
nestedDir.addEntity(movie3);

dir.addEntity(file1);
dir.addEntity(file2);
dir.addEntity(nestedDir);

const searchApi = new SearchCommand();

const searchResults1 = searchApi.search(dir,[new ExtensionFilter('txt'),new SizeFilter(100)]);

console.log('searchResults1', searchResults1);