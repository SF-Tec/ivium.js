## Ivium and Core methods

:heavy_check_mark: ready
:small_orange_diamond: under development
:x: not working

| Ivium Methods | Core Methods                               |
| ------------- | ------------------------------------------ |
|               | :heavy_check_mark: IV_open()               |
|               | :heavy_check_mark: IV_close()              |
|               | :heavy_check_mark: IV_MaxDevices()         |
|               |                                            |
|               | :heavy_check_mark: IV_selectdevice(int)    |
|               | :heavy_check_mark: IV_getdevicestatus()    |
|               |                                            |
|               | :heavy_check_mark: IV_readSN()             |
|               | :heavy_check_mark: IV_connect(int)         |
|               | :heavy_check_mark: IV_connect(int)         |
|               | :heavy_check_mark: IV_VersionHost(version) |
|               | :heavy_check_mark: IV_VersionDll()         |
|               | :heavy_check_mark: IV_VersionCheck()       |
|               | :heavy_check_mark: IV_HostHandle()         |
|               | :heavy_check_mark: IV_VersionDllFile()     |
|               | :heavy_check_mark: IV_VersionDllFileStr()  |
|               | :heavy_check_mark: IV_SelectChannel(int)   |
|               | :small_orange_diamond: IV_getcellstatus()  |

| | :heavy_check_mark: IV_setconnectionmode(int) |
| | :small_orange_diamond: IV_setcellon(int) |
| | |
| | :small_orange_diamond: IV_setpotential(float) |
| | :small_orange_diamond: IV_setpotentialWE2(float) |
| | :small_orange_diamond: IV_setcurrent(float) |
| | :small_orange_diamond: IV_getpotential() |
| | :small_orange_diamond: IV_setcurrentrange(int) |
| | :small_orange_diamond: IV_setcurrentrangeWE2(int) |
| | :small_orange_diamond: IV_getcurrent() |
| | :small_orange_diamond: IV_getcurrentWE2() |
| | :small_orange_diamond: IV_setfilter(int) |
| | :small_orange_diamond: IV_setstability(int) |
| | :small_orange_diamond: IV_setbistatmode(int) |
| | :small_orange_diamond: IV_setdac(int, float) |
| | :small_orange_diamond: IV_getadc(int) |
| | :small_orange_diamond: IV_setmuxchannel(int) |
| | :small_orange_diamond: IV_setdigout(value) |
| | :small_orange_diamond: IV_getdigin(value) |
| | :small_orange_diamond: IV_setfrequency(value) |
| | :small_orange_diamond: IV_setamplitude(value) |
| | :small_orange_diamond: IV_getcurrenttrace(npoints, rate, values) |
| | :small_orange_diamond: IV_getcurrentWE2trace(npoints, rate, values) |
| | :small_orange_diamond: IV_getpotentialtrace(npoints, rate, values) |
| | :small_orange_diamond: IV_we32setchannel(index) |
| | :small_orange_diamond: IV_we32setoffset(index, value) |
| | :small_orange_diamond: IV_we32setoffsets(nval, values) |
| | :small_orange_diamond: IV_we32getoffsets(nval, values) |
| | :small_orange_diamond: IV_we32readcurrents(values) |
| | :small_orange_diamond: IV_readmethod(fname) |
| | :small_orange_diamond: IV_savemethod(fname) |
| | :small_orange_diamond: IV_startmethod(fname) |
| | :small_orange_diamond: IV_abort() |
| | :small_orange_diamond: IV_savedata(fname) |
| | :small_orange_diamond: IV_setmethodparameter(parname, parvalue) |
| | :small_orange_diamond: IV_Ndatapoints(value) |
| | :small_orange_diamond: IV_getdata(pointnr, x, y, z) |
| | :small_orange_diamond: IV_getdatafromline(pointnr, scannr, x, y, z) |
| | :small_orange_diamond: IV_getDbFileName(fname) |
