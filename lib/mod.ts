/**
 * returns a sequence of numbers
 * @param start starting number (inclusive)
 * @param end ending number (exclusive)
 * @param step steps between numbers
 * @returns an array containing the specified sequence of numbers
 */
/*#__NO_SIDE_EFFECTS__*/
export const range = (start: number, end: number, step: number = 1): number[] => {
	const len = Math.max(Math.ceil((end - start) / step), 0);
	const result = new Array(len);

	for (let i = 0; i < len; i++) {
		result[i] = start + (i * step);
	}

	return result;
};

/**
 * splits an array into chunks
 * @param array array to chunk
 * @param size maximum amount of elements per chunk
 * @returns array containing chunks of elements
 */
/*#__NO_SIDE_EFFECTS__*/
export const chunked = <T>(array: T[], size: number): T[][] => {
	const chunks: T[][] = [];

	for (let i = 0, il = array.length; i < il; i += size) {
		chunks.push(array.slice(i, i + size));
	}

	return chunks;
};

/**
 * returns transformed elements, skipping undefined values
 * @param array array to transform
 * @param mapper function that returns either the transformed element, or undefined
 * @returns an array of transformed elements
 */
/*#__NO_SIDE_EFFECTS__*/
export const mapDefined = <T, R>(array: T[], mapper: (value: T, index: number) => R | undefined): R[] => {
	const len = array.length;
	const mapped: R[] = [];

	let idx = 0;
	let temp: R | undefined;

	for (; idx < len; idx++) {
		if ((temp = mapper(array[idx], idx)) !== undefined) {
			mapped.push(temp);
		}
	}

	return mapped;
};

/**
 * partitions an array into two, based on whether they satisfy a given test
 * @param array array to test
 * @param predicate function to test each element with
 * @returns a tuple, with the first array containing elements that satisfy the test,
 * and the second array containing elements that doesn't satisfy the test.
 */
/*#__NO_SIDE_EFFECTS__*/
export const partition = <T>(array: T[], predicate: (item: T, index: number) => unknown): [T[], T[]] => {
	const a: T[] = [];
	const b: T[] = [];

	for (let idx = 0, len = array.length; idx < len; idx++) {
		const item = array[idx];
		(predicate(item, idx) ? a : b).push(item);
	}

	return [a, b];
};

/**
 * groups subsequent elements from an array based on a predicate
 * @param array array to cluster
 * @param predicate function to test consecutive elements with
 * @returns an array of clusters, where each cluster is an array of consecutive elements that satisfy the predicate
 */
/*#__NO_SIDE_EFFECTS__*/
export const cluster = <T>(array: T[], predicate: (a: T, b: T) => unknown): T[][] => {
	const len = array.length;

	if (len === 0) {
		return [];
	}

	let prev = array[0];
	let current = [prev];

	const clusters: T[][] = [current];

	for (let idx = 1; idx < len; idx++) {
		const item = array[idx];

		if (predicate(prev, item)) {
			current.push(item);
		} else {
			clusters.push(current = [item]);
		}

		prev = item;
	}

	return clusters;
};

/**
 * returns elements present in the first array but not in the second
 * @param a the source array
 * @param b the array to compare against
 * @returns an array of elements in a not present in b
 */
/*#__NO_SIDE_EFFECTS__*/
export const difference = <T>(a: T[], b: T[]): T[] => {
	return [...new Set(a).difference(new Set(b))];
};

/**
 * returns elements present in the first array but not in the second, based on a selector
 * @param a the source array
 * @param b the array to compare against
 * @param selector function to derive comparison keys
 * @returns an array of elements in a not present in b based on the selector
 */
/*#__NO_SIDE_EFFECTS__*/
export const differenceBy = <T, K>(a: T[], b: T[], selector: (value: T) => K): T[] => {
	const bSet = new Set(b.map(selector));
	const aSet = new Set<K>();

	return a.filter((value) => {
		const key = selector(value);

		if (!bSet.has(key) && !aSet.has(key)) {
			aSet.add(key);
			return true;
		}

		return false;
	});
};

/**
 * returns elements common to both arrays
 * @param a the first array
 * @param b the second array
 * @returns an array of elements present in both a and b
 */
/*#__NO_SIDE_EFFECTS__*/
export const intersection = <T>(a: T[], b: T[]): T[] => {
	return [...new Set(a).intersection(new Set(b))];
};

/**
 * returns an array with duplicate elements removed
 * @param array the array to deduplicate
 * @returns a new array with unique elements
 */
/*#__NO_SIDE_EFFECTS__*/
export const unique = <T>(array: T[]): T[] => {
	return [...new Set(array)];
};

/**
 * returns an array with elements unique by a selector's return value
 * @param array the array to process
 * @param selector function to derive uniqueness keys
 * @returns a new array with elements unique based on the selector's key
 */
/*#__NO_SIDE_EFFECTS__*/
export const uniqueBy = <T, K>(array: T[], selector: (value: T, index: number) => K): T[] => {
	const keys = new Set<K>();
	const values: T[] = [];

	for (let i = 0, il = array.length; i < il; i++) {
		const value = array[i];
		const key = selector(value, i);

		if (keys.has(key)) {
			continue;
		}

		keys.add(key);
		values.push(value);
	}

	return values;
};

/**
 * returns a random element from the array
 * @param arr the array to sample
 * @returns a random element or undefined if the array is empty
 */
/*#__NO_SIDE_EFFECTS__*/
export const sampleOne = <T>(arr: T[]): T | undefined => {
	const len = arr.length;
	return len !== 0 ? arr[Math.floor(Math.random() * len)] : undefined;
};

/**
 * selects a random subset of up to n elements from the array
 * @param arr the array to sample from
 * @param n the maximum number of elements to select
 * @returns a new array containing up to n randomly selected elements
 */
/*#__NO_SIDE_EFFECTS__*/
export const sample = <T>(arr: T[], n: number): T[] => {
	const result = [...arr];
	const len = result.length;

	n = Math.min(n, len);

	for (let i = 0; i < n; i++) {
		const j = i + Math.floor(Math.random() * (len - i));
		[result[i], result[j]] = [result[j], result[i]];
	}

	return len > n ? result.slice(0, Math.max(0, n)) : result;
};

/**
 * shuffles the elements of the array
 * @param arr the array to shuffle
 * @returns a new array with elements in random order
 */
/*#__NO_SIDE_EFFECTS__*/
export const shuffle = <T>(arr: T[]): T[] => {
	return sample(arr, Infinity);
};

/** a type of falsy values */
export type FalsyValue = false | null | undefined | 0 | '';

/**
 * filters out falsy values from the array
 * @param arr the array to filter
 * @returns a new array with all falsy values removed
 */
/*#__NO_SIDE_EFFECTS__*/
export const definite = <T>(arr: (T | FalsyValue)[]): T extends FalsyValue ? never[] : T[] => {
	// deno-lint-ignore no-explicit-any
	return arr.filter(Boolean) as any;
};
