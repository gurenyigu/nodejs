// Buffer 对象的内存分配不是在 V8 的堆内存中的, 而是在 Node 的 C++ 层面实现内存的申请的.
// 因为处理大量的字节数据不能采用需要一点内存就向操作系统申请一点内存的方式, 这可能造成大量的内存申请的系统调用, 对操作系统有一定压力.
// 为此, Node在内存的使用上应用的是在 C++ 层面申请内存, 在 JavaScript 中分配内存的策略.

// 为了高效的使用申请来的内存, Node 采用了 slab 分配机制.
// slab: 一种动态内存管理机制, 最早诞生于 SunOS操作系统(Solaris)中, 目前在一些 *nix 操作系统中有广泛的应用.(*nix 就是unix 操作系统和linux操作系统。就是说只要你的操作系统是Unix或者linux，无论哪个开发商或者版本，就是属于*nix。)
// slab 简单地说, 就是一块申请好的固定大小的内存区域. slab具有如下 3 中状态:
// full: 完全分配
// partial: 部分分配状态
// empty: 没有被分配状态

// 当我们需要一个 Buffer 对象, 可以通过以下方式分配指定大小的 Buffer对象:
// new Buffer(size);
// Node 以 8KB 为界限来区分 Buffer 是大对象还是小对象:
// Buffer.poolSize = 8 * 1024;
// 这个 8KB 的值也就是每个 slab 的大小值, 在JavaScript 层面, 以它作为单位单元进行内存的分配.
