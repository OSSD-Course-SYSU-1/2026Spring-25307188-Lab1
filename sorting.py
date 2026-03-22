
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
if __name__ == "__main__":
    test_arr = [3,1,4,1,5,9,2,6]
    bubble_sort(test_arr)
    print("排序后：", test_arr)