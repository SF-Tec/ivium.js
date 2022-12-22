## Ivium and Core methods

:heavy_check_mark: ready
:small_orange_diamond: under development
:x: not working
:warning: not tested

| Ivium Methods | Core Methods                                                        |
| ------------- | ------------------------------------------------------------------- |
|               | :heavy_check_mark: IV_open()                                        |
|               | :heavy_check_mark: IV_close()                                       |
|               | :heavy_check_mark: IV_MaxDevices()                                  |
|               | :heavy_check_mark: IV_selectdevice(int)                             |
|               | :heavy_check_mark: IV_getdevicestatus()                             |
|               | :heavy_check_mark: IV_readSN()                                      |
|               | :heavy_check_mark: IV_connect(int)                                  |
|               | :heavy_check_mark: IV_connect(int)                                  |
|               | :heavy_check_mark: IV_VersionHost(version)                          |
|               | :heavy_check_mark: IV_VersionDll()                                  |
|               | :heavy_check_mark: IV_VersionCheck()                                |
|               | :heavy_check_mark: IV_HostHandle()                                  |
|               | :heavy_check_mark: IV_VersionDllFile()                              |
|               | :heavy_check_mark: IV_VersionDllFileStr()                           |
|               | :heavy_check_mark: IV_SelectChannel(int)                            |
|               |                                                                     |
|               | :heavy_check_mark: IV_getcellstatus()                           |
|               | :heavy_check_mark: IV_setconnectionmode(int)                        |
|               | :heavy_check_mark: IV_setcellon(int)                            |
|               | :heavy_check_mark: IV_setpotential(float)                       |
|               | :heavy_check_mark: IV_setpotentialWE2(float)                    |
|               | :heavy_check_mark: IV_setcurrent(float)                         |
|               | :heavy_check_mark: IV_getpotential()                            |
|               | :heavy_check_mark: IV_setcurrentrange(int)                      |
|               | :heavy_check_mark: IV_setcurrentrangeWE2(int)                   |
|               | :heavy_check_mark: IV_getcurrent()                              |
|               | :heavy_check_mark: IV_getcurrentWE2()                           |
|               | :heavy_check_mark: IV_setfilter(int)                            |
|               | :heavy_check_mark: IV_setstability(int)                         |
|               | :heavy_check_mark: IV_setbistatmode(int)                        |
|               | :heavy_check_mark: IV_setdac(int, float)                        |
|               | :heavy_check_mark: IV_getadc(int)                               |
|               | :heavy_check_mark: IV_setmuxchannel(int)                        |
|               | :heavy_check_mark: IV_setdigout(value)                          |
|               | :heavy_check_mark: IV_getdigin(value)                           |
|               | :heavy_check_mark: IV_setfrequency(value)                       |
|               | :heavy_check_mark: IV_setamplitude(value)                       |
|               | :heavy_check_mark: IV_getcurrenttrace(npoints, rate, values)    |
|               | :heavy_check_mark: IV_getcurrentWE2trace(npoints, rate, values) |
|               | :heavy_check_mark: IV_getpotentialtrace(npoints, rate, values)  |
|               |                                                                     |
|               | :warning: IV_we32setchannel(index)                     |
|               | :warning: IV_we32setoffset(index, value)               |
|               | :warning: IV_we32setoffsets(nval, values)              |
|               | :warning: IV_we32getoffsets(nval, values)              |
|               | :warning: IV_we32readcurrents(values)                  |
|               |                                                                     |
|               | :heavy_check_mark: IV_readmethod(fname)                             |
|               | :heavy_check_mark: IV_savemethod(fname)                             |
|               | :heavy_check_mark: IV_startmethod(fname)                            |
|               | :heavy_check_mark: IV_abort()                                       |
|               | :heavy_check_mark: IV_savedata(fname)                               |
|               | :heavy_check_mark: IV_setmethodparameter(parname, parvalue)         |
|               | :heavy_check_mark: IV_Ndatapoints(value)                            |
|               | :heavy_check_mark: IV_getdata(pointnr, x, y, z)                     |
|               | :heavy_check_mark: IV_getdatafromline(pointnr, scannr, x, y, z)     |
|               |                                                                     |
|               | :small_orange_diamond: IV_getDbFileName(fname)                      |
